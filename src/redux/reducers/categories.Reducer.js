import { SET_CATEGORIES } from '../actions/categoriesActions'

const initialState = {}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export default categoriesReducer