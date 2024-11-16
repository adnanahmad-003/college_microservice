import axios from 'axios'

const API_URL = process.env.REACT_APP_NEWS_API_URL || 'http://localhost:3001'

export const getNews = async () => {
    const response = await axios.get(`${API_URL}/news`)
    return response.data
}