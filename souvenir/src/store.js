import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {postaddreducers, postlistreducers, usersigninreducers ,usersignupreducers } from "./reducers";


const initialState = {
    user:{
        userInfo: localStorage.getItem("UserInfo")
        ? JSON.parse(localStorage.getItem("UserInfo"))
        : null
    },
    post:{
        posts:localStorage.getItem("Posts")
        ? JSON.parse(localStorage.getItem("Posts"))
        : []
    }
};

const reducer = combineReducers({
    user:usersigninreducers,
    newuser:usersignupreducers,
    postlist:postlistreducers,
    post:postaddreducers
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;