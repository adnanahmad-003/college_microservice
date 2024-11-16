import { useState, useEffect } from 'react'
import { Container, Typography, TextField, Box, CircularProgress } from '@mui/material'
import { getPhdTeachers } from '../../services/phdTeacherService'
import { PhDTeacherCard } from './PhDTeacherCard'

export const PhDTeacherList = () => {
    const [teachers, setTeachers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true)
            try {
                const data = await getPhdTeachers(searchTerm)
                setTeachers(data)
            } catch (error) {
                console.error('Error fetching PhD teachers:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchTeachers()
    }, [searchTerm])

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>PhD Faculty Members</Typography>
            <TextField
                fullWidth
                label="Search by name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 4 }}
            />
            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                teachers.map(teacher => (
                    <PhDTeacherCard key={teacher.id} teacher={teacher} />
                ))
            )}
        </Container>
    )
}