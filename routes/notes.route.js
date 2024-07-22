const express = require('express');
const { getNotes, createNote, getNoteById, deleteNote, updateNote } = require('../controllers/notes.controller.js');

const router = express.Router();

router.route('/').get(getNotes);

router.route('/:id').get(getNoteById);

router.route('/').post(createNote);

router.route('/:id').put(updateNote);

router.route('/:id').delete(deleteNote);


module.exports = router;
