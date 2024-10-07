const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes.route.js');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
const passport = require('passport');
const passportStrategy = require('./passport.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();
const app = express();

mongoose.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("Connection Failed error ====>", error));

// Session Middleware - Ensure it's added before Passport initialization
app.use(
    session({
        secret: 'keepNotes',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.uri,
            collectionName: 'sessions',
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true, // Set to true if using HTTPS
            httpOnly: true,
        },
    })
);

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow sending cookies
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/notes', noteRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Notes App');
});
