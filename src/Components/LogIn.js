import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import "./SignUp.css"
//
export default function LogIn({ setToken,setAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const logIn = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      setAdmin(res.data.payload.admin);
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data.token));

      history.push("/");
    } catch (err) {
      console.log("err");
    }
  };
  return (
    <div className="loginbox">
      <h1> LOGIN </h1>
      <GrUserManager className="log" />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="email"
      />
     <br />
      <RiLockPasswordFill className="log" />
      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="password"
        placeholder="pass"
      />
      <button
        onClick={() => {
          logIn();
        }}
      >
        logIn
      </button>
    </div>
  );
}
