import axios from 'axios'

const API_URL = process.env.REACT_APP_COURSE_API_URL || 'http://localhost:3003'

export const getCourses = async (branch, semester) => {
    const response = await axios.get(`${API_URL}/courses${branch && semester ? `?branch=${branch}&semester=${semester}` : ''}`)
    return response.data
}