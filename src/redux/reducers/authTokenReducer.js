import { SET_AUTH_TOKEN } from '../actions/authTokenActions';

const initialState = {
    access: null,
    refresh: null
};

const authTokenReducer = (state = initialState, action) => {
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