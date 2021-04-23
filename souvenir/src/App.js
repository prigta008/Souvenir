import React from 'react'; 
import {BrowserRouter , Route} from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
   <Header/>
<Route path="/signin" component={Signin}></Route>
<Route path="/signup" component={Signup}></Route>
<Route path="/home" component={home} ></Route>
<Route path="/user" component={user}></Route>
<Route path="/add" component={add}></Route>
<Route path="/bell" component={bell}></Route>
<Route path="/cog" component={cog}></Route>
<Route path="/" exact={true} component={entry}></Route>
   <Footer/>
   </BrowserRouter>
  );
}

export default App;
