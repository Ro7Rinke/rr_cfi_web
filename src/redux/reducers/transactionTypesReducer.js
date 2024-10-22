import { SET_TRANSACTION_TYPES } from '../actions/transactionTypesActions'

const initialState = {}

const transactionTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACTION_TYPES:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export default transactionTypesReducer