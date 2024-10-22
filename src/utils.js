const Utils = {
    formatToBRL: (value) => {
        return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        })
    },
}

export default Utils