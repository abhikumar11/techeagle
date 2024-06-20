import axios from 'axios';
import { AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS, TASK_FAIL, TASK_REQUEST, TASK_SUCCESS } from './constants';

export const signin = (username, password) => async dispatch => {
  dispatch({ type:AUTH_REQUEST });
  try {
    const { data } = await axios.post('http://localhost:3001/api/auth/signin', { username, password });
    localStorage.setItem('token', data.token);
    dispatch({ type:AUTH_SUCCESS, payload: { token: data.token, user: data.user } });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.message });
  }
};
export const getTasks = () => async dispatch => {
    dispatch({ type:TASK_REQUEST });
    try {
      const { data } = await axios.get('http://localhost:3001/api/tasks',{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch({ type:TASK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TASK_FAIL, payload: error.message });
    }
  };
  
  export const addTask = name => async dispatch => {
    dispatch({ type: TASK_REQUEST });
    try {
      await axios.post('http://localhost:3001/api/tasks/add', { name },{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(getTasks());
    } catch (error) {
      dispatch({ type: TASK_FAIL, payload: error.message });
    }
  };
  
  export const updateTask = (id, action) => async dispatch => {
    dispatch({ type: TASK_REQUEST });
    try {
      await axios.patch(`http://localhost:3001/api/tasks/${id}`, { action },{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(getTasks());
    } catch (error) {
      dispatch({ type: TASK_FAIL, payload: error.message });
    }
  };
  
  export const deleteTask = id => async dispatch => {
    dispatch({ type: TASK_REQUEST });
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(getTasks());
    } catch (error) {
      dispatch({ type: TASK_FAIL, payload: error.message });
    }
  };

export const signup = (username, password) => async dispatch => {
  dispatch({ type: AUTH_REQUEST });
  try {
    await axios.post('http://localhost:3001/api/auth/signup', { username, password });
    dispatch(signin(username, password));
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.message });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: "LOGOUT" });
};
