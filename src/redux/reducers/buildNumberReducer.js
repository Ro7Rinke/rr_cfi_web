import { SET_BUILD_NUMBER } from '../actions/buildNumberActions'

const initialState = -1

const buildNumberReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILD_NUMBER:
            return action.payload
        default:
            return state
    }
}

export default buildNumberReducer