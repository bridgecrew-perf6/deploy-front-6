import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import axios from "axios";
import "./SignUp.css"
//
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const addUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signUp`, {
      name,
      email,
      password,
    });
    if (res.status === 201) {
      history.push("/logIn");
    }
  };
  return (
    <div className="loginbox">
      <h1>SIGN UP</h1>
      <GrUserManager className="log" />
      <input
        onChange={(e) => {
          changeName(e);
        }}
        type="text"
        placeholder="name"
      />
      <br />
      <br />
      <GrUserManager className="log" />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="email"
      />
      <br />
      <br />
      <RiLockPasswordFill className="log" />
      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="password"
        placeholder="password"
      />
      <br />
      <br />

      <button
        onClick={() => {
          addUser();
        }}
      >
        SignUp
      </button>
    </div>
  );
}
