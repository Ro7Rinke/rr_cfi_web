import axios from "axios"

const Utils = {
    formatToBRL: (value) => {
        return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        })
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
    }
}

export default Utils