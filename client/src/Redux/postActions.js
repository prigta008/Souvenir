import Axios from "axios";
import Swal from "sweetalert2";
import { ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, DELETE, FAIL, LIST_POST_FAIL, LIST_POST_REQUEST, LIST_POST_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_EDIT_FAIL, POST_EDIT_REQUEST, POST_EDIT_SUCCESS, POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS, REQ, SUCCESS, URL } from "./constants";
//getting posts by id
export const postlist = (user_id) => async (dispatch) => {
    dispatch({ type: POST_LIST_REQUEST, payload: user_id });
    try {
        const { data } = await Axios.get(URL + `/api/posts/get/allpost/${user_id}`);
        dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}
export const postfollowing = (following) => async (dispatch) => {
    dispatch({ type: LIST_POST_REQUEST, payload: following });
    try {
        const { data } = await Axios.post(URL + `/api/posts/get/allposts/following`, { following });
        dispatch({ type: LIST_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LIST_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
//getting post details
export const postdet = (_id) => async (dispatch) => {
    dispatch({ type: POST_DETAILS_REQUEST, payload: _id });
    try {
        const { data } = await Axios.get(URL + `/api/posts/get/post/${_id}`);
        dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}
//adding post
export const addpost = (title, type, content, font, author, user_id) => async (dispatch) => {
    dispatch({ type: ADD_POST_REQUEST, payload: { title, type, content, font, author, user_id } });
    if (type) {
        try {
            const { data } = await Axios.post(URL + "/api/posts/post/post", { title, content, font, author, user_id });
            dispatch({ type: ADD_POST_SUCCESS, payload: data });
            if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") { Swal.fire({ icon: "success", html: 'New Post Added' }) };
        } catch (error) {
            dispatch({
                type: ADD_POST_FAIL, payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            });
            if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: "Something went Wrong !" }) };
        }
    }
    else {
        try {
            var s = localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")) : [], date = new Date()
                , o = { title: title, content: content, font: font, author: author, user_id: user_id, createdAt: date.toISOString() }, t = [];
            for (let i = 0; i < s.length; i++) {
                t.push(s[i]);
            }
            t.push(o);
            localStorage.setItem("Posts", JSON.stringify(t));
            if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") { Swal.fire({ icon: "success", html: "Post Added Privately" }) };
        } catch (error) {
            if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: error }) }
        }
    }
}
export const editpostaction = (_id, title, font, content) => async (dispatch) => {
    dispatch({ type: POST_EDIT_REQUEST, payload: { _id, title, font, content } });
    try {
        const { data } = await Axios.put(URL + "/api/posts/put/post", { _id, title, font, content });
        dispatch({ type: POST_EDIT_SUCCESS, payload: data });
        if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") { Swal.fire({ icon: "success", html: "Updated Sucessfully" }) };
    } catch (error) {
        dispatch({
            type: POST_EDIT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}
export const deleteprivate = (t)=>(dispatch) => {
    let u = localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")) : [];
    localStorage.setItem("Posts", JSON.stringify(u.filter((v) => v.createdAt !== t)));
    dispatch({ type: DELETE, payload: t.toISOString() });
}
export const deletepost = () => (dispatch) => {
    var t = new Date(); dispatch({ type: DELETE, payload: t.toISOString() });
}
export const makePostOffToOn = (t) => async (dispatch) => {
    dispatch({ type: REQ, payload: t });
    let { author, content, font, title, user_id } = t, u = localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")) : [];
    try {
        const { data } = await Axios.post(URL + "/api/posts/post/post", { title, content, font, author, user_id });
        dispatch({ type: SUCCESS, payload: data });
        localStorage.setItem("Posts", JSON.stringify(u.filter((v) => v.createdAt !== t.createdAt)));
        if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") { Swal.fire({ icon: "success", html: "Done Successfully !" }) };
        dispatch({ type: DELETE, payload: t.toISOString() });
    } catch (error) {
        dispatch({
            type: FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") {
            Swal.fire({ icon: "error", html: error })
        };
    }
}
export const offedit=(t)=>(dispatch)=>{
    dispatch({type:POST_DETAILS_SUCCESS,payload:t})
}