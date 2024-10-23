import { SET_AUTH_TOKEN } from '../actions/authTokenActions';

export const initialStateAuthToken = {
    access: null,
    refresh: null
};

const authTokenReducer = (state = initialStateAuthToken, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default authTokenReducer;