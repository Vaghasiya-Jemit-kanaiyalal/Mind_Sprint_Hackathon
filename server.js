const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend'));

// Save donor form data
app.post('/submit-donor', (req, res) => {
    const data = `${new Date().toLocaleString()} | Name: ${req.body.name}, Blood Group: ${req.body.bloodGroup}, Hospital: ${req.body.hospital}, Area: ${req.body.area}, Mobile: ${req.body.mobile}\n`;
    fs.appendFileSync(path.join(__dirname, 'donors.txt'), data);
    res.redirect('/frontend/blood_donors.html');
});

// Display donor data
app.get('/donors-data', (req, res) => {
    const filePath = path.join(__dirname, 'donors.txt');
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        res.type('text').send(content.replace(/\n/g, '<br>'));
    } else {
        res.send('No donor data yet.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
