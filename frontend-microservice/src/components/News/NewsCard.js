import { Card, CardContent, Typography, Box } from '@mui/material'

export const NewsCard = ({ news }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h5">{news.title}</Typography>
                <Typography color="text.secondary">
                    {news.startDate ? `${news.startDate} - ${news.endDate}` : news.date}
                </Typography>
                <Typography variant="body2">{news.description}</Typography>
                <Box mt={1}>
                    <Typography variant="body2">
                        Venue: {news.venue.place}, {news.venue.city}
                    </Typography>
                    <Typography variant="body2">
                        Organiser: {news.organiser}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}