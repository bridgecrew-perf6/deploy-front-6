import React, { useState } from "react";
import "./Welcome.css";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from "../../Imgs/logo.png";
import Homevideo from "../../videos/VID-20211217-WA0004.mp4";

export default function Welcome(props) {
  const navigate = useNavigate();
  const [showContact, setshowContact] = useState(false);

  function goToSignUp() {
    navigate("/SignupAndLogin");
  }

  return (
    <>
      <div className="welcome">
        <div className="welcome-nav">
          <a class="logo" href="/welcome">
            <img src={logo} />
          </a>
          <Navbar logOut={props.logOut} userInfo={props.userInfo}></Navbar>
        </div>

        <div className="video landing">
          <video
            className="wlc"
            autoPlay
            src={Homevideo}
            type="video/mp4"
          ></video>
          <div className="welcome-text">
            <h3>مرحبًا بكم</h3>
            <h1>في موسم الرياض</h1>
            <p>
              <a href="/home">إحجز تذكرتك</a>
              .. واستمتع بالفعاليات
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
