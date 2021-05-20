import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { numreducers, postaddreducers, postdetreducers, postlistreducers, searchreducers, themereducers, userdetreducers, userinforeducer, usersigninreducers, usersignupreducers } from "./reducers";

var date = new Date();
const initialState = {
    user: {
        userInfo: localStorage.getItem("UserInfo")
            ? JSON.parse(localStorage.getItem("UserInfo"))
            : null
    },
    post: {
        posts: localStorage.getItem("Posts")
            ? JSON.parse(localStorage.getItem("Posts"))
            : []
    },
    theme: {
        color: localStorage.getItem("Color")
            ? localStorage.getItem("Color").toString()
            : "has-background-white has-text-black"
    },
    num: {
        num: date.toString()
    }
};

const reducer = combineReducers({
    user: usersigninreducers,
    newuser: usersignupreducers,
    postlist: postlistreducers,
    post: postaddreducers,
    theme: themereducers,
    userinfo: userinforeducer,
    search: searchreducers,
    det: postdetreducers,
    userdet: userdetreducers,
    num: numreducers
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;