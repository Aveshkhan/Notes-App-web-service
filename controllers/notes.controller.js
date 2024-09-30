const Note = require('../models/notes.model.js')

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).populate('creator');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

const createNote = async (req, res) => {
    const { userId, title, content } = req.body;
    try {
        const note = new Note({
            creator: userId,
            title,
            content,
        });
        console.log('new Note ===>', note)
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id

        const note = await Note.findById(noteId)
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

const updateNote = async (req, res) => {
    const { title, content } = req.body;
    const noteId = req.params.id;
    try {

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id

        const note = await Note.findByIdAndDelete(noteId)
        res.status(200).json({ message: `${note.title} Note Deleted Successfully` })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


const getNotesByUserId = async (req, res) => {
    try {
        const param = req.params
        console.log(param)
        const notes = await Note.find({
            creator: param.id
        }).populate('creator');
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
    getNotesByUserId
}