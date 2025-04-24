import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const tokens = JSON.parse(tokenString);
        config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }
    return config;
});

export default axiosInstance;