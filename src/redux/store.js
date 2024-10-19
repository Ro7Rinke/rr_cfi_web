import { createStore, combineReducers } from 'redux';
import authTokenReducer from './reducers/authTokenReducer';

const rootReducer = combineReducers({
    authToken: authTokenReducer, // Adicione o reducer no rootReducer
});

const store = createStore(rootReducer);

export default store;