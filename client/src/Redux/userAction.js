import Axios from "axios";
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGN_OUT,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    URL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    FOLLOW_REQUEST,
    FOLLOW_FAIL,
    FOLLOW_SUCCESS,
    SELF_RELOAD_REQUEST,
    SELF_RELOAD_SUCCESS,
    SELF_RELOAD_FAIL
} from "./constants";
import Swal from "sweetalert2";
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(URL + "/api/user/post/user/signin", { email, password });
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
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
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password, username, age, time, img } });
    try {
        const { data } = await Axios.post(URL + "/api/user/post/user/signup",
            { email, password, username, age, time, img });
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL, payload:
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
        const { data } = await Axios.put(URL + "/api/user/put/user", { _id, username, desc, age, img });
        localStorage.setItem('UserInfo', JSON.stringify(data));
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
        Swal.fire({ icon: "info", html: "Updated Successfully", footer: "Note: If shown Image at user page is not Updated , Reload the Page" });
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
export const followaction = (subject, object) => async (dispatch) => {
    dispatch({ type: FOLLOW_REQUEST, payload: { subject, object } });
    try {
        const { data } = await Axios.put(URL + "/api/user/put/follow", { subject, object }), { s, o } = data;
        localStorage.setItem("UserInfo", JSON.stringify(s));
        dispatch({ type: FOLLOW_SUCCESS, payload: o });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: s });
    } catch (error) {
        dispatch({
            type: FOLLOW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const selfReloadUserDetails = (id) => async (dispatch) => {
    dispatch({ type: SELF_RELOAD_REQUEST, payload: id });
    try {
        const { data } = await Axios.get(URL + `/api/user/get/following/list/${id}`);
        let t = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")) : {},
            u = { _id: t._id, username: t.username, description: t.description, followers: t.followers, following: data, img: t.img, email: t.email, createdAt: t.createdAt, age: t.age };
        localStorage.setItem("UserInfo", JSON.stringify(u));
        dispatch({ type: SELF_RELOAD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SELF_RELOAD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}