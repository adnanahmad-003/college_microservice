import { Card, CardContent, Typography, CardMedia } from '@mui/material'

export const ClubCard = ({ club }) => {
    return (
        <Card sx={{ mb: 2 }}>
            {club.imageUrl && (
                <CardMedia
                    component="img"
                    height="140"
                    image={club.imageUrl}
                    alt={club.name}
                />
            )}
            <CardContent>
                <Typography variant="h6" gutterBottom>{club.name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                    {club.category}
                </Typography>
                <Typography variant="body2">{club.description}</Typography>
            </CardContent>
        </Card>
    )
}