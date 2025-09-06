const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/images', express.static(path.join(__dirname, 'frontend/images')));


// Endpoint to handle donor submissions
app.post('/api/donor', (req, res) => {
    const donorData = `${req.body.name},${req.body.bloodGroup},${req.body.hospital},${req.body.area},${req.body.mobile}\n`;
    fs.appendFile(path.join(__dirname, '../data/donors.txt'), donorData, (err) => {
        if (err) {
            return res.status(500).send('Error saving donor data');
        }
        res.status(200).send('Donor data saved successfully');
    });
});

// Endpoint to handle blood request submissions
app.post('/api/request', (req, res) => {
    const requestData = `${req.body.name},${req.body.patientType},${req.body.bloodGroup},${req.body.units},${req.body.hospital},${req.body.area},${req.body.mobile}\n`;
    fs.appendFile(path.join(__dirname, '../data/requests.txt'), requestData, (err) => {
        if (err) {
            return res.status(500).send('Error saving request data');
        }
        res.status(200).send('Request data saved successfully');
    });
});

// Endpoint to fetch all donors
app.get('/api/donors', (req, res) => {
    fs.readFile(path.join(__dirname, '../data/donors.txt'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading donor data');
        }
        const donors = data.trim().split('\n').map(line => {
            const [name, bloodGroup, hospital, area, mobile] = line.split(',');
            return { name, bloodGroup, hospital, area, mobile };
        });
        res.status(200).json(donors);
    });
});

// Endpoint to fetch all requests
app.get('/api/requests', (req, res) => {
    fs.readFile(path.join(__dirname, '../data/requests.txt'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading request data');
        }
        const requests = data.trim().split('\n').map(line => {
            const [name, patientType, bloodGroup, units, hospital, area, mobile] = line.split(',');
            return { name, patientType, bloodGroup, units, hospital, area, mobile };
        });
        res.status(200).json(requests);
    });
});
// NEW CODE TO ADD: Endpoint to fetch urgent requests
app.get('/api/urgent-requests', (req, res) => {
    fs.readFile(path.join(__dirname, '../data/requests.txt'), 'utf8', (err, data) => {
        if (err) {
            // If the file doesn't exist or there's an error reading it, return an empty array or an error message
            if (err.code === 'ENOENT') {
                console.warn('requests.txt not found, returning empty urgent requests array.');
                return res.status(200).json([]); // Return empty array if file not found
            }
            console.error('Error reading requests.txt for urgent requests:', err);
            return res.status(500).send('Error reading request data for urgent requests');
            }
        // Split data into lines, filter out empty lines, and map to objects
        const requests = data.trim().split('\n').filter(line => line.length > 0).map(line => {
            const [name, patientType, bloodGroup, units, hospital, area, mobile] = line.split(',');
            return { name, patientType, bloodGroup, units, hospital, area, mobile };
        });
        // Filter for urgent requests
        const urgentRequests = requests.filter(request => request.patientType && request.patientType.toLowerCase() === 'urgent');
        res.status(200).json(urgentRequests);
    });
});
// END OF NEW CODE
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});