import { TASK_FAIL, TASK_REQUEST, TASK_SUCCESS } from "../constants";

const initialState = {
    tasks: [],
    loading: false,
    error: null
  };
  
  export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case TASK_REQUEST:
        return { ...state, loading: true, error: null };
      case TASK_SUCCESS:
        return { ...state, loading: false, tasks: action.payload };
      case TASK_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
