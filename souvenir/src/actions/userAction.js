import Axios from "axios";
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGN_OUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "../constants";

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/user/post/user/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("UserInfo", JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const signup = (email, password, username, age, time) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { email, password, username, age, time } });
    try {
        const { data } = await Axios.post("/api/user/post/user/signup", { email, password, username, age, time });
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
        localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}
export const signout = () => async (dispatch) => {
    dispatch({ type: USER_SIGN_OUT });
    localStorage.removeItem("UserInfo");
}
export const updateuser = (_id, username, desc, age, password ) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST, payload: { _id, username, desc, age, password  } });
    try {
        const { data } = await Axios.put("/api/user/put/user", { _id, username, desc, age, password});
       dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}