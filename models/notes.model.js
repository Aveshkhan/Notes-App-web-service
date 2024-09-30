const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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