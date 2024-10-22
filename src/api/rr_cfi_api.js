import axios from '../config/axiosConfig';
import { HTTP_METHOD } from '../config/constants';
const API = {
    getAuthToken: async (username, password) => {
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
    },
    getInstallmentsListByMonthYear: async (month, year) => {
        try {
            const params = {
                month,
                year
            }
            const response = await axios.get(`/cfi/installments/list-month-year`, {params});
            return response.data;
        } catch (error) {
            console.log(error)
            return []
        }
    },
    getCategories: async () => {
        try {
            const response = await axios.get(`/cfi/categories`);
            return response.data;
        } catch (error) {
            console.log(error)
            return []
        }
    },
    checkToken: async (token) => {
        try {
            const response = await axios.get(`/cfi/token/check`,);
            return response.data;
        } catch (error) {
            console.log(error)
            return false
        }
    },
    sendEntry: async (entry) => {
        try {
            const config = {
                method: entry.id ? HTTP_METHOD.PATCH : HTTP_METHOD.POST,
                url: '/cfi/entries/',
                data: entry
            }
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log(error)
            return false
        }
    },
}

export default API