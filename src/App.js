import React, { useState,useEffect } from "react";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import NavBar from "./Components/NavBar";
import Games from "./Components/Games";
import Game from "./Components/Game"
import Profile from "./Components/Profile";
import Favorite from "./Components/Favorite"
import { Route } from "react-router-dom";
import PostGame from "./Components/PostGame";
require('dotenv').config()
//////
export default function App() {
  console.log(process.env.REACT_APP_BACKEND_URL,"backend url");
  // const [token, setToken] = useState()
  const [admin, setAdmin] = useState(false)
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const defultValue = JSON.parse(saved);
    return defultValue ;
  });
  useEffect(() => {
    // localStorage.setItem("token", JSON.stringify(token));
    localStorage.getItem("token", JSON.stringify(token));
    // eslint-disable-next-line
  }, []);
///////////////////////////////
  return (
    <div>
      <NavBar admin={admin}  token={token} setToken={setToken} />
      <Route
        exact
        path="/"
        render={() => {
          return <Games admin={admin}    token={token}/>;
        }}
      />
         <Route
        exact
        path="/PostGame"
        render={() => {
          return <PostGame   token={token}/>;
        }}
      />
     
       <Route
        exact
        path="/Favorite"
        render={() => {
          return <Favorite  token={token}/>;
        }}
      />
        <Route
        exact
        path="/Profile"
        render={() => {
          return <Profile  token={token} setToken={setToken}/>;
        }}
      />
         <Route
        exact
        path="/Game/:id"
        render={() => {
          return <Game admin={admin}  token={token}/>;
        }}
      />
      <Route
        exact
        path="/LogIn"
        render={() => {
          return <LogIn setToken={setToken} setAdmin={setAdmin} />;
        }}
      />
      <Route exact path="/SignUp" component={SignUp} />
      {/* <UploadForm/> */}
    </div>
  );
}
