const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/user");

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { name, thumbnail, track } = req.body;
            if (!name || !thumbnail || !track) {
                return res.status(400).json({ error: "Insufficient details to create song." });
            }
            const artist = req.user._id;
            const songDetails = { name, thumbnail, track, artist };
            const createdSong = await Song.create(songDetails);
            return res.status(201).json(createdSong);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

router.get(
    "/get/mysongs",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const songs = await Song.find({ artist: req.user._id }).populate("artist");
            return res.status(200).json({ data: songs });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { artistId } = req.params;
            const artist = await User.findById(artistId);
            if (!artist) {
                return res.status(404).json({ error: "Artist not found" });
            }
            const songs = await Song.find({ artist: artistId });
            return res.status(200).json({ data: songs });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

router.get(
    "/get/songname/:songName",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { songName } = req.params;
            const songs = await Song.find({ name: { $regex: songName, $options: "i" } }).populate("artist");
            return res.status(200).json({ data: songs });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;
