export const SET_TRANSACTION_TYPES = 'SET_TRANSACTION_TYPES';

export const setTransactionTypes = (value) => {
    return {
        type: SET_TRANSACTION_TYPES,
        payload: value,
    };
};