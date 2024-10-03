const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes.route.js')
const authRoutes = require('./routes/authRoutes.js')
const cors = require('cors')
const passport = require('passport')
const passportStrategy = require("./passport.js")
const cookieSession = require('cookie-session')

dotenv.config()
const app = express();

app.use(
    cookieSession({
        name: "session",
        keys: ["keepNotes"],
        maxAge: 24 * 60 * 60 * 100,
    })
);
app.use(express.json());
app.use(cors({
    origin: ['https://keep-notes-ashy-chi.vercel.app'],
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