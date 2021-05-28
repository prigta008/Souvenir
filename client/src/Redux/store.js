import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
    deletepostreducers,
    getcommentlistsreducers,
    postaddreducers,
    postdetreducers,
    postfolingreducers,
    postlistreducers,
    searchreducers,
    themereducers,
    userdetreducers,
    usersigninreducers
} from "./reducers";

const initialState = {
    user: {
        userInfo: localStorage.getItem("UserInfo")
            ? JSON.parse(localStorage.getItem("UserInfo"))
            : null
    },
    theme: {
        color: localStorage.getItem("Color")
            ? localStorage.getItem("Color").toString()
            : "has-background-white has-text-black"
    }
};

const reducer = combineReducers({
    user: usersigninreducers,
    postlist: postlistreducers,
    post: postaddreducers,
    theme: themereducers,
    search: searchreducers,
    det: postdetreducers,
    userdet: userdetreducers,
    folingposts: postfolingreducers,
    num:deletepostreducers,
    comments:getcommentlistsreducers
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;