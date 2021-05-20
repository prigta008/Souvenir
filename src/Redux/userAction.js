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
    SEARCH_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "./constants";
import Swal from "sweetalert2";
export const signin = (email, password, id) => async (dispatch) => {//use - signin and update user profile
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    if (email === "" && password === "") {
        await Axios.get(URL + `/api/user/get/userdet/${id}`)
            .then((res) => {
                localStorage.setItem("UserInfo", JSON.stringify(res.data));
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: res.data });
            })
            .catch((err) => { return; });
    }
    else {
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
export const updateuser = (_id, username, desc, age, img) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST, payload: { _id, username, desc, age, img } });
    try {
        await Axios.put(URL + "/api/user/put/user", { _id, username, desc, age, img }, { headers: { "Access-Control-Allow-Origin": "*" } })
            .then(res => {
                dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
                localStorage.setItem("UserInfo", JSON.stringify(res.data));
                Swal.fire({ icon: "info", html: "Updated Successfully", footer: "Note: If shown Image is not Updated , Reload the Page" });
            })
            .catch((e) => console.log(e))
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
export const themechanger = (color) => (dispatch) => {
    if (color === "has-background-dark has-text-white") {
        color = "has-background-white has-text-black";
        dispatch({ type: "WHITE", color: color });
        localStorage.setItem("Color", "has-background-white has-text-black");
    } else {
        color = "has-background-dark has-text-white";
        dispatch({ type: "BLACK", color: color });
        localStorage.setItem("Color", "has-background-dark has-text-white");
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
export const userdetaction = (_id) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: _id });
    try {
        const { data } = await Axios.get(URL + `/api/user/get/userdet/${_id}`);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const anony = () => async (dispatch) => {
    dispatch({ type: "CHANGE" });
}