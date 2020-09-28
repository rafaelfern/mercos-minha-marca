import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5f2c373bffc88500167b8cce.mockapi.io',
    // timeout: 6000000,
});

export default api
