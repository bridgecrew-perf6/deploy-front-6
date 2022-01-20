import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./NavBar.css"
//////////////
export default function NavBar({ token, setToken,admin }) {
  const [user, setUser] = useState([]);
  //
  // eslint-disable-next-line
  useEffect(async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user`,
      { headers: { authorization: "Bearer " + token } }
    );
    try {
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  //https://avatarfiles.alphacoders.com/178/178027.png
  return (
    <div className="divNavBar">
      {token ? (
        <ul>
          <li>
            <Link to="/">Games</Link>
          </li>

          <li>
            {user.admin === true ? <Link to="/PostGame"> PostGame </Link> : ""}
          </li>
          <li>
            <Link to="/Favorite">Favorite</Link>
          </li>
          <li>
            <Link
              onClick={() => {
                localStorage.setItem("token", JSON.stringify(""));
                setToken("");
              }}
              to="/logIn"
            >
              {" "}
              log out{" "}
            </Link>
          </li>
          <li id="profile-img">
            <Link to="/Profile">
              {/* eslint-disable-next-line*/}
              <img className="imgNavBar" src={user.img} />
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/logIn">logIn</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
