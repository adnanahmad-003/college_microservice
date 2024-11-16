const express = require('express');
const newsData = require('./data');

const app = express();
const PORT = 3001;

app.get('/news', (req, res) => {
    res.json(newsData);
});

app.listen(PORT, () => {
    console.log(`News microservice running at http://localhost:${PORT}`);
});
