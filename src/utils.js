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
    }
}

export default Utils