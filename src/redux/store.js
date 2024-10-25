import { createStore, combineReducers } from 'redux';
import authTokenReducer from './reducers/authTokenReducer';
import categoriesReducer from './reducers/categories.Reducer';
import transactionTypesReducer from './reducers/transactionTypesReducer';
import buildNumberReducer from './reducers/buildNumberReducer';

const rootReducer = combineReducers({
    authToken: authTokenReducer,
    categories: categoriesReducer,
    transactionTypes: transactionTypesReducer,
    buildNumber: buildNumberReducer
});

const store = createStore(rootReducer);

export default store;