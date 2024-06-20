import { AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS } from "../constants"

const initialState = {
    user:null,
    loading:false,
    error:null,
    token:localStorage.getItem("token"),
}
export const authReducer=(state=initialState,action)=> {
    switch (action.type){
        case AUTH_REQUEST:
            return {...state,loading:true,error:null}
        case AUTH_SUCCESS:
            return {...state,loading:false,token:action.payload.token, user: action.payload.user}
        case AUTH_FAIL:
            return {...state,loading:false,error:action.payload}
        case "Logout":
            return {...state,user:null,token:null}
        default: 
            return state;
    }
}
