import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Entry from './components/entry';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Home from "./components/home";
import User from "./components/user";
import Add from "./components/add";
import Bell from "./components/bell";
import Cog from "./components/cog";
import Edit from './components/Edit';
import Prof from "./components/Prof";
import UserProf from './components/userProf';
function NotFound() {
  return (
    <>Error 404
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
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
            <Route path="/edit" exact={true} component={Edit} ></Route>
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