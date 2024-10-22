import { createStore, combineReducers } from 'redux';
import authTokenReducer from './reducers/authTokenReducer';
import categoriesReducer from './reducers/categories.Reducer';
import transactionTypesReducer from './reducers/transactionTypesReducer';

const rootReducer = combineReducers({
    authToken: authTokenReducer,
    categories: categoriesReducer,
    transactionTypes: transactionTypesReducer
});

const store = createStore(rootReducer);

export default store;