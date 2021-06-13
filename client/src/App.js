import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './index.css';
import Entry from './Pages/entry';
import { Header, Footer } from "./components/Header";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Home from "./Pages/home";
import User from "./Pages/user";
import Add from "./Pages/add";
import Bell from "./Pages/bell";
import Cog from "./Pages/cog";
import Edit from './Pages/Edit';
import Prof from "./Pages/Prof";
import UserProf from './Pages/userProf';
import EditPost from './Pages/EditPost';
import About from './Pages/about';
import Glossary from './Pages/Glossary';
function App() {
  const theme = useSelector(state => state.theme), { color } = theme;
  return (
    <BrowserRouter>
      <div className="hder">
        <Header />
      </div>
      <div className={`min ${color}`}>
        <Route path="/signin" exact={true} component={Signin}></Route>
        <Route path="/signup" exact={true} component={Signup}></Route>
        <Route path="/user" exact={true} component={User}></Route>
        <Route path="/add" exact={true} component={Add}></Route>
        <Route path="/bell" exact={true} component={Bell}></Route>
        <Route path="/cog" exact={true} component={Cog}></Route>
        <Route path="/about" exact={true} component={About}></Route>
        <Route path="/home" exact={true} component={Home} ></Route>
        <Route path="/glossary" exact={true} component={Glossary}></Route>
        <Route path="/edit/user" exact={true} component={Edit} ></Route>
        <Route path="/edit/post/:id" exact={true} component={EditPost}></Route>
        <Route path="/posts/:id" exact={true} component={Prof}></Route>
        <Route path="/userProf/:id" exact={true} component={UserProf}></Route>
        <Route path="/" exact={true} component={Entry}></Route>
      </div>
      <div className={`fter ${color}`}>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;