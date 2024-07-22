const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes.route.js')
const cors = require('cors')

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const URI = process.env.uri;
app.use('/api/notes', noteRoutes)


mongoose.connect(URI).then(() => {
    console.log("DB Connected")
    app.listen(PORT, console.log(`Server is running on port ${PORT}`))
}).catch((error) => {
    console.log("Connection Failed error ====>", error);
})

app.get('/', (req, res) => {
    res.send('Welcome to Notes App')
})