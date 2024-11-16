import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Container, useScrollTrigger, Slide } from '@mui/material'
import { NewsList } from './components/News/NewsList'
import { TeacherList } from './components/Teachers/TeacherList'
import { CourseList } from './components/Courses/CourseList'
import { PhDTeacherList } from './components/PhDTeachers/PhDTeacherList'
import { ClubList } from './components/Clubs/ClubList'
import { useState, useEffect } from 'react'

function App() {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const trigger = useScrollTrigger()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems = [
        { path: '/', label: 'News' },
        { path: '/faculty', label: 'Faculty' },
        { path: '/courses', label: 'Courses' },
        { path: '/phd-teachers', label: 'PhD Faculty' },
        { path: '/clubs', label: 'Clubs' }
    ]

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f7f7f7' }}>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar 
                    elevation={isScrolled ? 2 : 0}
                    sx={{
                        bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar sx={{ justifyContent: 'space-between', height: '80px' }}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #FF385C 30%, #FF385C 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                IIIT Dharwad
                            </Typography>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    gap: 2,
                                    borderRadius: '40px',
                                    padding: '8px 16px',
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                                }}
                            >
                                {navigationItems.map((item) => (
                                    <Link 
                                        key={item.path}
                                        to={item.path} 
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Box
                                            sx={{
                                                px: 3,
                                                py: 1,
                                                borderRadius: '20px',
                                                bgcolor: location.pathname === item.path ? '#FF385C' : 'transparent',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    bgcolor: location.pathname === item.path 
                                                        ? '#FF385C' 
                                                        : 'rgba(255, 56, 92, 0.1)',
                                                }
                                            }}
                                        >
                                            <Typography 
                                                sx={{
                                                    color: location.pathname === item.path ? 'white' : '#222',
                                                    fontWeight: 500,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    </Link>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Slide>

            <Container 
                maxWidth="xl" 
                sx={{ 
                    pt: 12,
                    pb: 4,
                    minHeight: 'calc(100vh - 80px)',
                }}
            >
                <Box 
                    sx={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                        }
                    }}
                >
                    <Routes>
                        <Route path="/" element={<NewsList />} />
                        <Route path="/faculty" element={<TeacherList />} />
                        <Route path="/courses" element={<CourseList />} />
                        <Route path="/phd-teachers" element={<PhDTeacherList />} />
                        <Route path="/clubs" element={<ClubList />} />
                    </Routes>
                </Box>
            </Container>
        </Box>
    )
}

export default App