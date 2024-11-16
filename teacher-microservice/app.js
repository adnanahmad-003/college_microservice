const express = require('express');
const teacherData = require('./data');

const app = express();
const PORT = 3002;

app.get('/teachers', (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (name) {
        const result = teacherData.filter(teacher => teacher.name.toLowerCase().includes(name));
        return res.json(result);
    }
    res.json(teacherData);
});

app.listen(PORT, () => {
    console.log(`Teacher microservice running at http://localhost:${PORT}`);
});
