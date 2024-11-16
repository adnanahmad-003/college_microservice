const express = require('express');
const clubData = require('./data');

const app = express();
const PORT = 3004;

// Route to get all clubs or search clubs by name
app.get('/clubs', (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (name) {
        const result = clubData.filter(club => club.name.toLowerCase().includes(name));
        return res.json(result);
    }
    res.json(clubData);
});

// Route to get clubs by type (Technical or Cultural)
app.get('/clubs-by-type', (req, res) => {
    const clubsByType = clubData.reduce((acc, club) => {
        if (!acc[club.type]) {
            acc[club.type] = [];
        }
        acc[club.type].push(club);
        return acc;
    }, {});

    res.json(clubsByType);
});

app.listen(PORT, () => {
    console.log(`Clubs microservice running at http://localhost:${PORT}`);
});
