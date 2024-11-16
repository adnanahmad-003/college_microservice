import { useState, useEffect } from 'react'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import { getClubs } from '../../services/clubService'
import { ClubCard } from './ClubCard'

export const ClubList = () => {
    const [clubs, setClubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchClubs = async () => {
            setLoading(true)
            try {
                const data = await getClubs()
                setClubs(data)
            } catch (error) {
                console.error('Error fetching clubs:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchClubs()
    }, [])

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Student Clubs</Typography>
            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                clubs.map(club => (
                    <ClubCard key={club.id} club={club} />
                ))
            )}
        </Container>
    )
}