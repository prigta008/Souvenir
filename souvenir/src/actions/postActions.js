import Axios from "axios";
import Swal from "sweetalert2";
import { ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS, POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS } from "../constants";

export const postlist = (user_id) => async (dispatch) => {
    dispatch({ type: POST_LIST_REQUEST, payload: user_id });
    try {
        const { data } = await Axios.get(`/api/posts/get/allpost/${user_id}`);
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
export const addpost = (title, type, content, font, author, user_id) => async (dispatch) => {
    dispatch({ type: ADD_POST_REQUEST, payload: { title, type, content, font, author, user_id } });
    try {
        if (type === true) {
            const { data } = await Axios.post("/api/posts/post/post", { title, content, font, author, user_id });
            dispatch({ type: ADD_POST_SUCCESS, payload: data });
            Swal.fire('New Post Added');
        }
        else {
            const offline = localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")) : [];
            var arr = offline;//amazing hack of subsitution
            const data = {
                title: title,
                content: content,
                font: font,
                author: author,
                user_id: user_id
            };
            arr.push(data);
            localStorage.setItem("Posts", JSON.stringify(arr));
            dispatch({ type: ADD_POST_SUCCESS, payload: data });
            Swal.fire('New Post Added');
        }
    } catch (error) {
        dispatch({
            type: ADD_POST_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
        Swal.fire('Something Went Wrong');
    }
}