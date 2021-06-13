import Axios from "axios";
import Swal from "sweetalert2";
import { DELETE, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, POST_COMMENT_FAIL, POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS, URL } from "./constants";
export const getComment = (id) => async (dispatch) => {
    dispatch({ type: GET_COMMENT_REQUEST, payload: id });
    try {
        const { data } = await Axios.get(URL + `/api/comments/get/comments/${id}`);
        dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_COMMENT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const postComment = (author, user_id, post_id, content) => async (dispatch) => {
    dispatch({ type: POST_COMMENT_REQUEST, payload: { author, user_id, post_id, content } });
    var t = new Date();
    try {
        const { data } = await Axios.post(URL + "/api/comments/post/comment", { author, user_id, post_id, content });
        dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
        if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") { Swal.fire({ icon: "success", html: "Added Successfully" }).then(dispatch({ type: DELETE, payload: t.toDateString() })) }
    } catch (error) {
        dispatch({
            type: POST_COMMENT_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") { Swal.fire({ icon: "error", html: error }) }
    }
}
export const pageAction = (t) => (dispatch) => {
    switch (t) {
        case "COG":
            dispatch({ type: t });
            break;
        case "USER":
            dispatch({ type: t });
            break;
        case "ADD":
            dispatch({ type: t });
            break;
        case "BELL":
            dispatch({ type: t });
            break;
        default:
            dispatch({ type: "HOME" });
            break;
    }
}