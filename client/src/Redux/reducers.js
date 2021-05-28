import {
    ADD_POST_FAIL,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    DELETE,
    GET_COMMENT_FAIL,
    GET_COMMENT_REQUEST,
    GET_COMMENT_SUCCESS,
    LIST_POST_FAIL,
    LIST_POST_REQUEST,
    LIST_POST_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_LIST_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    SEARCH_FAIL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGN_OUT
} from "./constants";
export const usersigninreducers = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGN_OUT:
            return {};
        default:
            return state;
    }
}

export const userdetreducers = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, data: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const postlistreducers = (state = {}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { loading: true }
        case POST_LIST_SUCCESS:
            return { loading: false, list: action.payload }
        case POST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export const postaddreducers = (state = {}, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return { loading: true }
        case ADD_POST_SUCCESS:
            return { loading: false, post: action.payload }
        case ADD_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export const postfolingreducers = (state = {}, action) => {
    switch (action.type) {
        case LIST_POST_REQUEST:
            return { loading: true }
        case LIST_POST_SUCCESS:
            return { loading: false, response: action.payload }
        case LIST_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export const postdetreducers = (state = {}, action) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { loading: true }
        case POST_DETAILS_SUCCESS:
            return { loading: false, data: action.payload }
        case POST_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const themereducers = (state = {}, action) => {
    switch (action.type) {
        case "WHITE":
            return { color: "has-background-white has-text-black" };
        case "BLACK":
            return { color: "has-background-dark has-text-white" };
        default:
            return state;
    }
}
export const searchreducers = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return { loading: true }
        case SEARCH_SUCCESS:
            return { loading: false, searchres: action.payload }
        case SEARCH_FAIL:
            return { laoding: false, error: action.payload }
        default:
            return state;
    }
}
export const deletepostreducers = (state = {}, action) => {
    switch (action.type) {
        case DELETE:
            return { num: action.payload }
        default:
            return state;
    }
}
export const getcommentlistsreducers = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENT_REQUEST:
            return { loadinglist: true }
        case GET_COMMENT_SUCCESS:
            return { loadinglist: false, comments: action.payload }
        case GET_COMMENT_FAIL:
            return { loadinglist: false, errorlist: action.payload }
        default:
            return state;
    }
}