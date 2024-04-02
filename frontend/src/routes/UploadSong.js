import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconText from "../components/IconText";
import photo from "../files/logo5.png";
import TextWithHover from '../components/TextWithHover';
import TextInput from '../components/TextInput';
import CloudinaryUpload from '../components/CloudinaryUpload';
// import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
// import piano from "../files/piano.jpg";
// import piano2 from "../files/piano2.jpg";    
// import piano3 from "../files/piano3.jpg";


const UploadSong = () => {
    // console.log(window);
    // console.log(window.cloudinary);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState("");
    const navigate=useNavigate();
    const submitSong= async()=>{
      
        const  data={name,thumbnail,track : playlistUrl};
        const response=await makeAuthenticatedPOSTRequest("/song/create",data);
        if(response.err)
        {
            alert("Could not create song");
        }
        alert("Success");
        navigate("/mymusic");

    }
    return (
        <div className="w-full h-full flex">

            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10 " >
                <div>
                    <div className="logoDiv p-6">
                        <img src={photo} width="125" />
                    </div>
                    <div className="py-5">
                        <IconText iconName={"ep:home-filled"} displayText={"Home"} active />
                        <IconText iconName={"tabler:search"} displayText={"Search"} />
                        <IconText iconName={"solar:playlist-outline"} displayText={"Your Library"} />
                        <IconText iconName={"majesticons:music"} displayText={"My songs"} />
                    </div>
                    <div className="pt-5">
                        <IconText iconName={"ph:plus-fill"} displayText={"Create Playlist"} />
                        <IconText iconName={"bxs:like"} displayText={"Liked Songs"} />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-500 text-white flex w-2/5 px-2 py-1 items-center justify-center rounded-full cursor-pointer hover:border-white">
                        <Icon icon="mingcute:earth-line" />
                        <div className="ml-1 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>


            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black  flex items-center justify-end sticky top-0">
                    <div className="h-full flex w-1/2">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2  border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex h-full items-center justify-around">
                            <TextWithHover displayText={"Upload Song"} />
                            <div className="bg-white h-1/2 px-4 flex items-center justify-center rounded-full  font-semibold cursor-pointer">
                                Log In
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0">
                    <div className="text-xl font-semibold mb-5 text-white mt-8">Upload Your Song</div>
                </div>
                <div className="w-2/3 flex space-x-3" >
                    <div className="w-1/2">
                        <TextInput label="Song Name" labelClassname={"text-white"} placeholder={"Enter song name"} value={name} setValue={setName} />
                    </div>
                    <div className="w-1/2">
                        <TextInput label="Thumbnail" labelClassname={"text-white"} placeholder={"Enter Thumbnail URL"} value={thumbnail} setValue={setThumbnail} />
                    </div>

                </div>
                <div className='py-5'>
                    {
                        uploadedSongFileName ? (
                            <div className="bg-white p-3 w-1/3 rounded-full" >
                                {uploadedSongFileName.substring(0, 35)}......
                            </div>
                        ) : (

                            <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName} />
                        )
                    }
                </div>
                <div className="bg-white w-40 flex items-center justify-center ml-4 rounded-full p-3 cursor-pointer font-semibold" onClick={submitSong}>
                   Submit Song

                </div>
            </div>


        </div>



    );
};



export default UploadSong;