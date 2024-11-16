import axios from 'axios'

const API_URL = process.env.REACT_APP_CLUB_API_URL || 'http://localhost:3006'

export const getClubs = async () => {
    const response = await axios.get(`${API_URL}/clubs`)
    return response.data
}