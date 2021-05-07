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
    UPDATE_USER_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
    URL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from "../constants";
import Swal from "sweetalert2";
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(URL + "/api/user/post/user/signin", { email, password });
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
export const signup = (email, password, username, age, time, img) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { email, password, username, age, time, img } });
    try {
        const { data } = await Axios.post(URL + "/api/user/post/user/signup",
            { email, password, username, age, time, img });
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
export const updateuser = (_id, username, desc, age, password, img) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST, payload: { _id, username, desc, age, password, img } });
    try {
        const { data } = await Axios.put(URL + "/api/user/put/user", { _id, username, desc, age, password, img });
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        localStorage.setItem("UserInfo", JSON.stringify(data));
        Swal.fire({ title: "info", html: "Updated Successfully" })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        Swal.fire("Something Went Wrong");
    }
}
export const getuserinfo = (user_id) => async (dispatch) => {
    dispatch({ type: USER_INFO_REQUEST, payload: user_id });
    try {
        const { data } = await Axios.get(URL + `/api/user/get/username/${user_id}`);
        dispatch({ type: USER_INFO_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_INFO_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const themechanger = (data) => (dispatch) => {
    if (data === true) {
        dispatch({ type: "DARK" });
        const color = {
            "color": "#FAFAFA",
            "backgroundColor": "#363537"
        }
        localStorage.setItem("Theme", JSON.stringify(color));
        localStorage.setItem("Data", false);
    } else {
        dispatch({ type: "LIGHT" });
        const color = {
            "color": "#363537",
            "backgroundColor": "#fff"
        }
        localStorage.setItem("Theme", JSON.stringify(color));
        localStorage.setItem("Data", true);
    }
}
export const searchaction = (type, search) => async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST, payload: { type, search } });
    try {
        if (type === "post") {
            const { data } = await Axios.get(URL + `/api/posts/get/allpostby/${search}`)
            if (data.length === 0) {
                Swal.fire({ icon: "error", html: "Not Found ! We search via Title (and Username)" })
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
        } else {
            const { data } = await Axios.get(URL + `/api/user/get/username/${search}`);
            if (data.length === 0) {
                Swal.fire({ icon: "error", html: "Not Found ! We search via Title (and Username)" })
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
        }
    } catch (error) {
        dispatch({
            type: SEARCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}