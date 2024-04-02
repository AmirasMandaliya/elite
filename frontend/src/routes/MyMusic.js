
import { useState, useEffect } from 'react';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

import SingleSongCard from '../components/SingleSongCard';
import LoggedInContainer from '../containers/LoggedInContainer';

const MyMusic=()=>{
    const [songData,setSongData] = useState([]);
    useEffect(()=>{
    const getData= async()=>{
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      setSongData(response.data);
    };
    getData();
},[]);
    
    return(
        <LoggedInContainer curActiveScreen="myMusic">
           
                    <div className="text-white text-2xl font-semibold pb-4 pl-2 pt-5">My Songs</div>
                    <div className="space-y-3 overflow-auto">
                    {songData.map((item)=>{
                      return <SingleSongCard info={item} playSound={()=>{}}/>
                    })}
                    </div>
        </LoggedInContainer>
    );
};




export default MyMusic;