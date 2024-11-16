const express = require('express');
const teacherData = require('./data');

const app = express();
const PORT = 3002;

// Route to search teachers by name
app.get('/faculties', (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (name) {
        const result = teacherData.filter(teacher => teacher.name.toLowerCase().includes(name));
        return res.json(result);
    }
    res.json(teacherData);
});


app.get('/faculty', (req, res) => {
    const facultyByDepartment = teacherData.reduce((acc, teacher) => {
        if (!acc[teacher.department]) {
            acc[teacher.department] = [];
        }
        acc[teacher.department].push(teacher);
        return acc;
    }, {});

    res.json(facultyByDepartment);
});

app.listen(PORT, () => {
    console.log(`Teacher microservice running at http://localhost:${PORT}`);
});
