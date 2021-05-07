import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import entry from './components/entry';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/signin";
import Signup from "./components/signup";
import home from "./components/home";
import user from "./components/user";
import add from "./components/add";
import bell from "./components/bell";
import cog from "./components/cog";
import Edit from './components/Edit';
import Prof from "./components/Prof";
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
            <Route path="/home" exact={true} component={home} ></Route>
            <Route path="/user" exact={true} component={user}></Route>
            <Route path="/add" exact={true} component={add}></Route>
            <Route path="/bell" exact={true} component={bell}></Route>
            <Route path="/cog" exact={true} component={cog}></Route>
            <Route path="/edit" exact={true} component={Edit} ></Route>
            <Route path="/posts" component={Prof}></Route>
            <Route path="/userProf" component={Prof}></Route>
            <Route path="/" exact={true} component={entry}></Route>
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