import { Card, CardContent, Typography, List, ListItem } from '@mui/material'

export const CourseCard = ({ branch, semester, courses }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>{branch}</Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Semester {semester}
                </Typography>
                <List>
                    {courses.map((course, index) => (
                        <ListItem key={index}>
                            <Typography variant="body1">{course}</Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}