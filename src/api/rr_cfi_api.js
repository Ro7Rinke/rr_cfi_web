import axios from '../config/axiosConfig';
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
}

export default API