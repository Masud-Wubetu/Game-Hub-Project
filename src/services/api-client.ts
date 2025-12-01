import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://www.freetogame.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
 