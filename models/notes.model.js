const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
})

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;