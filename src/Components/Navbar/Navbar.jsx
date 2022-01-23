import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  const navigate = useNavigate();

  function goToSignUp() {
    navigate("/SignupAndLogin");
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark Navbar py-4">
      <div className="w-100 d-flex justify-content-between align-middle">
        <NavLink className="nav-link mx-md-4 mx-sm-0 my-sm-1" to="/welcome">
          Home
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse  navbar-collapse d-md-flex justify-content-between"
          id="collapsibleNavId"
        >
          <ul className="navbar-nav ">
            <li className="nav-item active ">
              <NavLink to="/home" className="nav-link  mx-md-4 mx-sm-0 my-sm-1">
                Bulevards
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/oiasis"
                className="nav-link mx-md-4 mx-sm-0 my-sm-1"
              >
                Oiasis
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/parks" className="nav-link mx-md-4 mx-sm-0 my-sm-1">
                Parks
              </NavLink>
            </li>
          </ul>
          <div className="cart-login d-flex align-items-center flex-sm-row-reverse justify-content-sm-between mt-md-0 mt-sm-4">
            <NavLink to="/cart" className="nopading fw-bold fe-5 ">
              {" "}
              <i className="fas fa-cart-plus fa-2x fs-3 p-2 me-2  nav-icons cartIcon"></i>
            </NavLink>
            {props.logOut ? (
              <NavLink
                onClick={() => {
                  window.location.reload(true);
                  localStorage.setItem("user", "");
                }}
                className=" mx-md-4 mx-sm-0 fs-5 fw-bold"
                to="/SignupAndLogin"
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                className="fs-5 mx-md-4 mx-sm-0 fw-bold btn btn-primary"
                to="/SignupAndLogin"
              >
                Signup/login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
