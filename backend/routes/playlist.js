const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist1");
const User=require("../models/user");
const Song=require("../models/Song");


router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: []
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);

   
});
router.get(
    "/get/me",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.user._id;

        const playlists = await Playlist.find({owner: artistId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    }
);

router.get("/get/playlist/:playlistId",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const playlistId=req.params.playlistId;
    const playlist=await Playlist.findOne({_id:playlistId}).populate({path:"songs",populate:{path:"artist"}}); 
    if(!playlist){
        return res.status(301).json({err:"Invalid Id"});
    }
    return res.status(200).json(playlist);
});

router.get("/get/artist/:artistId",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const artistId=req.params.artistId;
    const artist =await User.findOne({_id:artistId});
    if(!artist)
    {
        return res.status(304).json({err:"Invalid artistId"});
    }
    const playlists=await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlists});
})

router.post("/add/song", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    try {
        const playlist = await Playlist.findOne({ _id: playlistId });
        if (!playlist) {
            return res.status(404).json({ err: "Playlist does not exist" });
        }

        if (playlist.owner.toString() !== currentUser._id.toString() && !playlist.collaborators.includes(currentUser._id.toString())) {
            return res.status(403).json({ err: "Not allowed" });
        }

        const song = await Song.findOne({ _id: songId });
        if (!song) {
            return res.status(404).json({ err: "Song does not exist" });
        }

 
        playlist.songs.push(songId);

        await playlist.save();

        return res.status(200).json(playlist);
    } catch (error) {
        console.error("Error adding song:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});


module.exports = router;
 