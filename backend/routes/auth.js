const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { getToken } = require("../utils/helpers");

router.post("/register", async (req, res) => {
    const { email, password, firstName, lastName, userName } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(403)
            .json({ error: "A user with this email id already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, password: hashedPassword, firstName, lastName, userName };
    const newUser = await User.create(newUserData);

    const token = await getToken(email, newUser);
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(403).json({ error: "Invalid Email ID." });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password doesn't match, return error
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Invalid Password." });
        }

        // Generate token
        const token = await getToken(user.email, user);

        // Check if the user just registered
        const justRegistered = req.query.justRegistered === "true";

        // Prepare response
        let message = "Successfully logged in.";
        if (justRegistered) {
            message = "Successfully registered and logged in.";
        }
        const userToReturn = { ...user.toJSON(), token, message };
        delete userToReturn.password;

        // Return response
        return res.status(200).json(userToReturn);
    } catch (error) {
        // Handle any errors
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;