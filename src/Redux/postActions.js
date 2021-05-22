import Axios from "axios";
import Swal from "sweetalert2";
import { ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, LIST_POST_FAIL, LIST_POST_REQUEST, LIST_POST_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_EDIT_FAIL, POST_EDIT_REQUEST, POST_EDIT_SUCCESS, POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS, URL } from "./constants";
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
        const { data } = await Axios.post(URL+`/api/posts/get/allposts/following`,{following});
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
export const addpost = (title, content, font, author, user_id) => async (dispatch) => {
    content = content.replaceAll("\n", "<br/>");
    dispatch({ type: ADD_POST_REQUEST, payload: { title, content, font, author, user_id } });
    try {
        const { data } = await Axios.post(URL + "/api/posts/post/post", { title, content, font, author, user_id });
        dispatch({ type: ADD_POST_SUCCESS, payload: data });
        Swal.fire({ icon: "success", html: 'New Post Added' });
    } catch (error) {
        dispatch({
            type: ADD_POST_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        Swal.fire({ icon: "error", html: "Something went Wrong !" });
    }
}
export const editpostaction = (_id, title, font, content) => async (dispatch) => {
    dispatch({ type: POST_EDIT_REQUEST, payload: { _id, title, font, content } });
    try {
        const { data } = await Axios.put(URL + "/api/posts/put/post", { _id, title, font, content });
        dispatch({ type: POST_EDIT_SUCCESS, payload: data });
        Swal.fire({ icon: "success", html: "Updated Sucessfully" });
    } catch (error) {
        dispatch({
            type: POST_EDIT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}