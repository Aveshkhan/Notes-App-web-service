const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_KEY,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, callback) {
            console.log(profile)
            callback(null, profile)
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serializing User:", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserializing User:", user);
    done(null, user);
});
