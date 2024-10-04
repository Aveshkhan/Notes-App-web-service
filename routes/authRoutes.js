const express = require('express');
const passport = require('passport')
const dotenv = require('dotenv');
const User = require('../models/user.models');

dotenv.config()
const router = express.Router();

router.get('/login/success', async (req, res) => {
    console.log('REQ =============>>>', req);
    console.log('REQ USER =============>>>',req.user);
    if (req.user) {
        const { email, name, picture } = req.user._json;
        // console.log(' User ===> ', req.user._json)
        
        const userExists = await User.findOne({
            email: email,
        })
        console.log('Existed User ===>',userExists)
        if (!userExists) {
            const user = new User({
                email: email,
                username: name,
                image: picture,

            })
            console.log('User Creation ===>', user)
            const createdUser = await user.save();

            res.status(200).json({
                error: false,
                message: "Successfully Signed Up",
                user: createdUser,
                // user: req.user,
            })
        } else {
            console.log('User Exist in DB')

            res.status(200).json({
                error: false,
                message: "Successfully Loged In",
                user: userExists,
            })
        }


    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized"
        })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure"
    })
})

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}))

router.get('/google', passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
    req.logout();
    res.status(200).json({
        error: false,
        message: "LogedOut Successfully"
    });

})


module.exports = router;