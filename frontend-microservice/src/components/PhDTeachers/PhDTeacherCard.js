import { Card, CardContent, Typography } from '@mui/material'

export const PhDTeacherCard = ({ teacher }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>{teacher.name}</Typography>
                <Typography variant="body2">ID: {teacher.id}</Typography>
            </CardContent>
        </Card>
    )
}