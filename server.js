const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'develop', 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'develop', 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), 'utf8'));
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'develop', 'db', 'db.json'), JSON.stringify(notes));
    res.json(newNote);
});

app.use(express.static(path.join(__dirname, 'develop', 'public')));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});
