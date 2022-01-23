import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import logo from "../../Imgs/logo.png";
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
  const [userInfo, setuserInfo] = useState("");
  useEffect(() => {
    setuserInfo(props.userInfo);
    console.log(props.userInfo);
  }, [userInfo]);

  function sendProblem(e) {
    e.preventDefault();
  }
  return (
    <div className="sidebar">
      <a class="logo" href="/welcome">
        <img src={logo} />
      </a>
      <ul className="sidebar_nav p-0">
        <li>
          <a
            className="facebook"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <i class="fab fa-facebook-f"></i>
            Facebook
          </a>
        </li>
        <li>
          <a
            className="instagram"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <i class="fab fa-instagram "></i>
            Instgram
          </a>
        </li>
        <li>
          <a
            className="whatsapp"
            href="http://wa.me/+966555034404"
            target="_blank"
          >
            <i class="fab fa-whatsapp"></i>
            Whatsapp
          </a>
        </li>
      </ul>

      {/* <div className="footerAtSideBar px-2 ">
                             <form >
                             <label className='w-100 nopading m-1 fs-6 text-light'> First Name </label>
                            <input className='form-control w-75 m-0 border-dark' type="text" />

                            <label className='w-100 fs-6 m-1 text-light'>Last Name </label>
                            <input className='form-control w-75 m-0 border-dark' type="text" />

                            <label className='w-100 fs-6 mt-3  mb-0 text-light '> Descipe your problem </label>
                                <textarea className='w-75 rounded-3 border-1 border-dark' rows={5} > write your problem here</textarea>
                             <button type='submit'  className='btn bg-info fw-bold px-3 py-2 mt-3 '> <a href="http://wa.me/+0966555034404" target="_blank">Send Problem</a></button>
                             </form>

            </div> */}
    </div>
  );
}
