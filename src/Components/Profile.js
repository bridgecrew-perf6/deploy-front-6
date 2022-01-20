import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./Profile.css"
import { useHistory } from 'react-router-dom'
import {MdOutlineDeleteForever} from 'react-icons/md'
import {GrUpdate} from 'react-icons/gr'

import Up from "../firebase/comp/Up"
// import { storage } from "../firebase/Config";
export default function Profile({token,setToken}) {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const history = useHistory();
  ////////////////////////////////////////
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
    // eslint-disable-next-line
  }, [user]);
  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUserName = () => {
    const result = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/userName`,
      {
        name: name,
      },
      { headers: { authorization: "Bearer " + token } }
    );
    setName(result.data);
  };
  const updateImage = () => {
    const result = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/userImg`,
      {
        img: img,
      },
      { headers: { authorization: "Bearer " + token } }
    );
    setImg(result.data);
  };
  const removeUser = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
      { headers: { authorization: "Bearer " + token } }
    );
    console.log(result);
    if (result.status === user) {
      setUser(result.data);
    }
    if (result.status === 200) {
      setToken("");
      history.push("/SignUp");
    }
  };
  return (
    <div className="mainDivUser">
      <p>{user.name}</p>
      <img className="imgUser" src={user.img} alt="no img" />
      <br />

      <input
        className="inputProfile"
        type="text"
        placeholder="new name"
        onChange={(e) => {
          updateName(e);
        }}
      />
      <br />
      <div className="divIcon">
        <div className="Up">
          {" "}
          <Up setImg={setImg} />
        </div>
        <div className="GrUpdate">
          {" "}
          <GrUpdate
            className="buttonUpdate"
            onClick={() => {
              updateUserName();
              updateImage();
            }}
          />
        </div>
        <div className="MdOutlineDeleteForever">
          {" "}
          <MdOutlineDeleteForever
            className="reactIconDeleteUser"
            onClick={() => {
              removeUser(user._id);
            }}
          />
        </div>
      </div>
    </div>
  );
}