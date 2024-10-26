import axios from "axios"
import Cookies from 'js-cookie';

const Utils = {
    formatDate: (date) => {
        const localDate = new Date(date);
        localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());
        return localDate.toLocaleDateString('pt-BR');
    },
    formatToBRL: (value) => {
        return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        })
    },
    formatValue: (value) => {
        if(!value)
            return '0,00'
        value = parseInt(value, 10).toString();
        const formattedValue = (value.length === 1 
        ? '0,0' + value 
        : value.length === 2 
        ? '0,' + value 
        : value.slice(0, -2) + ',' + value.slice(-2)
        );
        return formattedValue
    },
    getDefaultTransactionTypes: (transactionTypes) => {
        let lastId = null
        for (const key in transactionTypes) {
            lastId = transactionTypes[key].id
            if(transactionTypes[key].default)
                return transactionTypes[key].id
        }
        return lastId ?? 1
    },
    getDefaultCategory: (categories) => {
        let lastId = null
        for (const key in categories){
            lastId = categories[key].id
            if(categories[key].default)
                return categories[key].id
        }
        return lastId ?? 1
    },
    getNumberOfCommits: async () => {
        try {
            const response = await axios.get('https://api.github.com/repos/Ro7Rinke/rr_cfi_web/commits')
            if(response && Array.isArray(response.data))
                return response.data.length
            return 0
        } catch (error) {
            console.error(error)
            return 0
        }
    },
    removeAllCookies: () => {
        const cookies = Cookies.get()
        for(const cookie in cookies){
            Cookies.remove(cookie)
        }
    }
}

export default Utils