const mongoose=require("mongoose");

const User=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
        private:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    likessongs:{
        type:String,
        default:"",
    },
    likePlaylists:{
        type:String,
        default:"",
    },
    subscribedartist:{
        type:String,
        default:"",
    },
})

const UserModel=mongoose.model("User",User);
module.exports=UserModel;
