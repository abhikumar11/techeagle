import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './reducer/authReducer';
import { taskReducer } from './reducer/taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
