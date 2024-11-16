const express = require('express');
const courseData = require('./data');

const app = express();
const PORT = 3003;

app.get('/courses', (req, res) => {
    const { branch, semester } = req.query;

    if (branch && semester) {
      
        const selectedBranch = courseData.find(
            course => course.branch.toLowerCase() === branch.toLowerCase()
        );

        if (selectedBranch) {
            const courses = selectedBranch.semesters[semester];
            if (courses) {
                return res.json({ branch: selectedBranch.branch, semester, courses });
            }
            return res
                .status(404)
                .json({ message: `No courses found for semester ${semester} in branch ${branch}.` });
        }
        return res.status(404).json({ message: `No branch found with name ${branch}.` });
    }

   
    res.json(courseData);
});

app.listen(PORT, () => {
    console.log(`Courses microservice running at http://localhost:${PORT}`);
});
