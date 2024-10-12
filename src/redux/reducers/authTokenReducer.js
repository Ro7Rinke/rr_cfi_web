import { SET_AUTH_TOKEN } from '../actions/authTokenActions';

const initialState = {
    authToken: null,
};

const authTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
};

export default authTokenReducer;