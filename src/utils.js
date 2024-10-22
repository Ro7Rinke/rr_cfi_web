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
        for (const key in transactionTypes) {
            if(transactionTypes[key].default)
                return transactionTypes[key].id
        }
        return 1
    }
}

export default Utils