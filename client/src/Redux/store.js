import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import thunk from "redux-thunk";
import {
    deletepostreducers,
    getcommentlistsreducers,
    pagereducers,
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
    page: {
        page: "home"
    },
    user: {
       userInfo:localStorage.getItem("UserInfo")
       ? JSON.parse(localStorage.getItem("UserInfo")):null
    },
    theme: {
        color: localStorage.getItem("Color") ? localStorage.getItem("Color").toString() : "has-background-white has-text-black"
    }
},
    reducer = combineReducers({
        user: usersigninreducers,
        postlist: postlistreducers,
        post: postaddreducers,
        theme: themereducers,
        search: searchreducers,
        det: postdetreducers,
        userdet: userdetreducers,
        folingposts: postfolingreducers,
        num: deletepostreducers,
        comments: getcommentlistsreducers,
        page: pagereducers
    }),
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
    store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;