export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const setAuthToken = (value) => {
    return {
        type: SET_AUTH_TOKEN,
        payload: value,
    };
};