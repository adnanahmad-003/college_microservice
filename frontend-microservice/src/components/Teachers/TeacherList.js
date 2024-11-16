import { useState, useEffect } from 'react'
import { Container, Typography, TextField, Box, CircularProgress } from '@mui/material'
import { getTeachers } from '../../services/teacherService'
import { TeacherCard } from './TeacherCard'

export const TeacherList = () => {
    const [teachers, setTeachers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await getTeachers(searchTerm)
                setTeachers(data)
            } catch (error) {
                console.error('Error fetching teachers:', error)
            } finally {
                setLoading(false)
            }
        }

        const debounceTimer = setTimeout(() => {
            fetchTeachers()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [searchTerm])

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Faculty Directory</Typography>
            <TextField
                fullWidth
                label="Search Faculty"
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
                    <TeacherCard key={teacher.id} teacher={teacher} />
                ))
            )}
        </Container>
    )
}