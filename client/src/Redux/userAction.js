import Axios from "axios";
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGN_OUT, UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, URL, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, FOLLOW_REQUEST, FOLLOW_FAIL,
    FOLLOW_SUCCESS, DELETE
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
},
 signup = (email, password, username, age, time, img) => async (dispatch) => {
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
},
 signout = () => async (dispatch) => {
    dispatch({ type: USER_SIGN_OUT });
    localStorage.removeItem("UserInfo");
},
 updateuser = (_id, username, desc, age, img) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST, payload: { _id, username, desc, age, img } });
    try {
        const { data } = await Axios.put(URL + "/api/user/put/user", { _id, username, desc, age, img });
        localStorage.setItem('UserInfo', JSON.stringify(data));
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        if ((localStorage.getItem("info") ? localStorage.getItem("info").toString() : "true") === "true") { Swal.fire({ icon: "info", html: "Updated Successfully" }) };
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: "Something Went Wrong" }) };
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
                if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: "Not Found ! We search via Title (and Username)" }) }
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
            else {
                dispatch({ type: SEARCH_SUCCESS, payload: data });
            }
        } else {
            const { data } = await Axios.get(URL + `/api/user/get/username/${search}`);
            if (data.length === 0) {
                if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: "Not Found ! We search via Title (and Username)" }) }
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
        var t = new Date(); dispatch({ type: DELETE, payload: t.toISOString() })
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
export const dataUpToDate = (id) => async (dispatch) => {
    try {
        await Axios.get(URL + `/api/user/get/userdetails/${id}`)
            .then(({ data }) => {
                localStorage.setItem("UserInfo", JSON.stringify(data));
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
            })
    } catch (error) {
        console.log(error.toString())
    }
}