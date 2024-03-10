const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const readNotesFromFile = () => {
    const data =fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    return JSON.parse(data);
};

const writeNotesToFile = (notes) => {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));
};

app.get('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = readNotesFromFile();
    newNote.id = uuidv4();
    notes.push(newNote);
    writeNotesToFile(notes);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
