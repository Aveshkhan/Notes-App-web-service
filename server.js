const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes.route.js')
const authRoutes = require('./routes/authRoutes.js')
const cors = require('cors')
const passport = require('passport')
const passportStrategy = require("./passport.js")
const MongoStore = require('connect-mongo'); // Import connect-mongo
const session = require('express-session');

dotenv.config()
const app = express();

app.use(
    session({
        secret: 'keepNotes', // A secret key for signing the session ID
        resave: false, // Forces the session to be saved back to the session store
        saveUninitialized: false, // Forces a session that is uninitialized to be saved to the store
        store: MongoStore.create({
            mongoUrl: process.env.uri, // Your MongoDB URI
            collectionName: 'sessions', // Optional: customize the session collection name
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time
        },
    })
);
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT;
const URI = process.env.uri;

app.use('/api/notes', noteRoutes)
app.use('/auth', authRoutes);


mongoose.connect(URI).then(() => {
    console.log("DB Connected")
    app.listen(PORT, console.log(`Server is running on port ${PORT}`))
}).catch((error) => {
    console.log("Connection Failed error ====>", error);
})

app.get('/', (req, res) => {
    res.send('Welcome to Notes App')
})