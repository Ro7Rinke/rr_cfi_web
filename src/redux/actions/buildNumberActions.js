export const SET_BUILD_NUMBER = 'SET_BUILD_NUMBER';

export const setBuildNumber = (value) => {
    return {
        type: SET_BUILD_NUMBER,
        payload: value,
    };
};