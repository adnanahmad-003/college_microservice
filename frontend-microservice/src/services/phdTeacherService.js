import axios from 'axios'

const API_URL = process.env.REACT_APP_PHD_TEACHER_API_URL || 'http://localhost:3005'

export const getPhdTeachers = async (name) => {
    const response = await axios.get(`${API_URL}/Phd_faculties${name ? `/name?name=${name}` : ''}`)
    return response.data
}