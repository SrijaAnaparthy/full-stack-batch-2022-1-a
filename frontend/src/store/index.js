import { createStore, combineReducers ,applyMiddleware} from 'redux';
import {Reducer} from './userReducer'
import thunk from 'redux-thunk'

var reducer = combineReducers({ users : Reducer});
//var reducer = userReducer;
const store = new createStore(reducer,applyMiddleware(thunk));
export default store;
