import { Card, CardContent, Typography } from '@mui/material'

export const TeacherCard = ({ teacher }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>{teacher.name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                    {teacher.department}
                </Typography>
                <Typography variant="body2">
                    Email: {teacher.email}
                </Typography>
            </CardContent>
        </Card>
    )
}