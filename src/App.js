import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Entry from './Pages/entry';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Home from "./Pages/home";
import User from "./Pages/user";
import Add from "./Pages/add";
import Bell from "./Pages/bell";
import Cog from "./Pages/cog";
import Edit from './components/Edit';
import Prof from "./components/Prof";
import UserProf from './components/userProf';
import EditPost from './components/EditPost';
import { NotFound } from './components/Error';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector(state=>state.theme),{color} = theme;
  return (
    <BrowserRouter>
      <div className={`grid-container ${color}`}>
        <div className="hder">
          <Header />
        </div>
        <div className="min">
          <Switch>
            <Route path="/signin" exact={true} component={Signin}></Route>
            <Route path="/signup" exact={true} component={Signup}></Route>
            <Route path="/home" exact={true} component={Home} ></Route>
            <Route path="/user" exact={true} component={User}></Route>
            <Route path="/add" exact={true} component={Add}></Route>
            <Route path="/bell" exact={true} component={Bell}></Route>
            <Route path="/cog" exact={true} component={Cog}></Route>
            <Route path="/edit/user" exact={true} component={Edit} ></Route>
            <Route path="/edit/post/:id" exact={true} component={EditPost}></Route>
            <Route path="/posts/:id" exact={true} component={Prof}></Route>
            <Route path="/userProf/:id" exact={true} component={UserProf}></Route>
            <Route path="/" exact={true} component={Entry}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <div className="fter">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;