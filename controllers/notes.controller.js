const Note = require('../models/notes.model.js')

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({
            title,
            content,
        });
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

const getNoteById = async (req, res) => {
    try{
        const noteId = req.params.id

        const note = await Note.findById(noteId)
        res.json(note)
    } catch (error){
        res.status(500).json({ message: 'Server Error' });
    }
    
}

const updateNote = async (req, res) => {
    const { title, content } = req.body;
    const noteId = req.params.id;
    try{

        const updatedNote = await Note.findByIdAndUpdate(
            noteId, 
            { title, content },
            {new: true , runValidators: true} 
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);

    } catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteNote = async (req, res) => {
    try{
        const noteId = req.params.id

        const note = await Note.findByIdAndDelete(noteId)
        res.json({ message: `${note.title} Note Deleted Successfully` })
    } catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
}