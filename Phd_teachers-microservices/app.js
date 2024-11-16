const express = require('express');
const teacherData = require('./data'); 

const app = express();
const PORT = 3005;

// Route to get all teachers
app.get('/Phd_faculties', (req, res) => {
    res.json(teacherData);
  });

// Route to search teachers by name
app.get('/Phd_faculties/name', (req, res) => {
    const { name } = req.query;
    if (name) {
      const results = teacherData.filter(teacher =>
        teacher.name.toLowerCase().includes(name.toLowerCase())
      );
      return res.json(results);
    }
    ;
  });

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the IIIT Dharwad Phd Faculties!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Teacher microservice running at http://localhost:${PORT}`);
});


