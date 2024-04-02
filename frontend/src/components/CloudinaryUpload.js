import {openUploadWidget} from "../utils/CloudinaryService";
// import {cloudinary_upload_preset} from "../../config";

const CloudinaryUpload = ({setUrl,setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dxbh9mqgf",
                uploadPreset: "pxj0myjn",
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                 if(error)
                 {
                   console.log(error);
                 }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button
            className="bg-white text-black  rounded-full p-4  mt-5 ml-5 font-semibold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button>
    );
};

export default CloudinaryUpload;