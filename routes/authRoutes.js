const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../models/user.models');

dotenv.config();
const router = express.Router();

router.get('/login/success', async (req, res) => {
    try {
        if (req.user) {
            const { email, name, picture } = req.user._json;

            const userExists = await User.findOne({ email });
            if (!userExists) {
                const user = new User({
                    email,
                    username: name,
                    image: picture,
                });
                const createdUser = await user.save();

                res.status(200).json({
                    error: false,
                    message: "Successfully Signed Up",
                    user: createdUser,
                });
            } else {
                res.status(200).json({
                    error: false,
                    message: "Successfully Logged In",
                    user: userExists,
                });
            }
        } else {
            res.status(403).json({
                error: true,
                message: "Not Authorized",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message,
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure",
    });
});

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,  // Ensure CLIENT_URL is correctly set in your .env
    failureRedirect: "/login/failed",
}));

router.get('/google', passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            error: false,
            message: "Logged Out Successfully"
        });
    });
});

module.exports = router;
