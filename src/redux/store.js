import { createStore, combineReducers } from 'redux';
import authTokenReducer from './reducers/authTokenReducer';
import categoriesReducer from './reducers/categories.Reducer';

const rootReducer = combineReducers({
    authToken: authTokenReducer,
    categories: categoriesReducer,
});

const store = createStore(rootReducer);

export default store;