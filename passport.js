const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const User = require("./models/user.models");
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
            console.log('GoogleStrategy ====> ', profile)

            const { email, name, picture } = profile._json;
            const userExists = await User.findOne({ email });
            if (!userExists) {
                const user = new User({
                    email,
                    username: name,
                    image: picture,
                });
                const createdUser = await user.save();
                await callback(null, createdUser)
            } else{
                await callback(null, userExists)
            }

            // callback(null, profile)
        }
    )
);

passport.serializeUser(async (user, done) => {
    console.log("Serializing User:", user.email);
    await done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    console.log("Deserializing User:", email);

    const user = await User.findOne({email})
    if(user){
        console.log('Deserialized User Found')
        await done(null, user);
    } else{
        console.log('Deserialized Error')
    }
});
