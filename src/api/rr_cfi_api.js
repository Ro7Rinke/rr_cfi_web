import axios from '../config/axiosConfig';

export const getAuthToken = async (username, password) => {
    try {
        const body = {
            username,
            password
        }
        const response = await axios.post(`/auth/token`, body);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};