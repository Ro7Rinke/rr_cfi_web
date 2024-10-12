import axios from '../axiosConfig';

// const API_URL = 'http://localhost:8010';

export const getAuthToken = async (username, password) => {
    try {
        const body = {
            username,
            password
        }
        const response = await axios.post(`/auth/token`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};