import axios from 'axios'

const API_URL = process.env.REACT_APP_TEACHER_API_URL || 'http://localhost:3002'

export const getTeachers = async (name) => {
    const response = await axios.get(`${API_URL}/faculties${name ? `?name=${name}` : ''}`)
    return response.data
}

export const getTeachersByDepartment = async () => {
    const response = await axios.get(`${API_URL}/faculty`)
    return response.data
}