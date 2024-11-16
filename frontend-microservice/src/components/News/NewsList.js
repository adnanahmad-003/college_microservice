import { useState, useEffect } from 'react'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import { getNews } from '../../services/newsService'
import { NewsCard } from './NewsCard'

export const NewsList = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews()
                setNews(data)
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Latest News</Typography>
            {news.map(item => <NewsCard key={item.id} news={item} />)}
        </Container>
    )
}