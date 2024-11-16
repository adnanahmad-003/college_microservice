import { useState, useEffect } from 'react'
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, CircularProgress } from '@mui/material'
import { getCourses } from '../../services/courseService'
import { CourseCard } from './CourseCard'

export const CourseList = () => {
    const [courses, setCourses] = useState(null)
    const [selectedBranch, setSelectedBranch] = useState('')
    const [selectedSemester, setSelectedSemester] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            if (selectedBranch && selectedSemester) {
                setLoading(true)
                try {
                    const data = await getCourses(selectedBranch, selectedSemester)
                    setCourses(data)
                } catch (error) {
                    console.error('Error fetching courses:', error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchCourses()
    }, [selectedBranch, selectedSemester])

    const branches = ['CSE', 'ECE']
    const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Course Catalog</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <FormControl fullWidth>
                    <InputLabel>Branch</InputLabel>
                    <Select value={selectedBranch} label="Branch" onChange={(e) => setSelectedBranch(e.target.value)}>
                        {branches.map(branch => (
                            <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Semester</InputLabel>
                    <Select value={selectedSemester} label="Semester" onChange={(e) => setSelectedSemester(e.target.value)}>
                        {semesters.map(sem => (
                            <MenuItem key={sem} value={sem}>Semester {sem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : courses && (
                <CourseCard branch={courses.branch} semester={courses.semester} courses={courses.courses} />
            )}
        </Container>
    )
}