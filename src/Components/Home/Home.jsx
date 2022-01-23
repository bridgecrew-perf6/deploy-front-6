import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "./../Footer/Footer";
import "./Home.css";
import bulivardsVideo from "./../../videos/VID-20211217-WA0002.mp4";
import posterbulivardsVideo from "./../../Imgs/poster2.png";
import axios from "axios";
import HomeItem from "./HomeItem";
import SongerItem from "./SongerItem";

export default function Home(props) {
  // console.log(props)
  const [ImagesArray, setImagesArray] = useState([]);
  const [songersArray, setSongersArray] = useState([]);
  const [videoUpperDiv, setvideoUpperDiv] = useState(false);
  const [add, setadd] = useState(false);
  const [addSonger, setaddSonger] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [category, setcategory] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [imageName, setimageName] = useState("");
  const [openVideoSrc, setopenVideoSrc] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [songerName, setSongerName] = useState("");
  const [songerAge, setSongerAge] = useState();

  useEffect(() => {
    setImagesArray(ImagesArray);
    let bulivardsArray = props.ImagesArray.filter(
      (element) => element.category == "bulivards"
    );
    setImagesArray(bulivardsArray);
    setuserEmail(props.userEmail);
  }, []);

  useEffect(async () => {
    let responseData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/songer`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setSongersArray(responseData.data);
    console.log(songersArray);
  }, []);

  function showForm() {
    setadd(true);
  }
  function showSongerForm() {
    setaddSonger(true);
  }
  function getNameValue(e) {
    setNameValue(e.target.value);
  }
  function getDescValue(e) {
    setDescValue(e.target.value);
  }
  function getCategory(e) {
    setcategory(e.target.value);
  }
  function getPriceValue(e) {
    setPriceValue(e.target.value);
  }
  function getImageName(e) {
    setimageName(e.target.value);
  }
  function getSongerName(e) {
    setSongerName(e.target.value);
  }
  function getSongerAge(e) {
    setSongerAge(e.target.value);
  }

  async function insertParty(e) {
    e.preventDefault();
    if (nameValue !== "" && descValue !== "") {
      let responsedata = await axios.post(
        "${process.env.REACT_APP_BACKEND_URL}/party",
        {
          name: nameValue,
          description: descValue,
          price: priceValue,
          img_url: imageName,
          category: category,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      );
    }

    props.getData();
    setadd(false);
    setDescValue("");
    setNameValue("");
    setimageName("");
    setcategory("");
  }

  async function insertSonger(e) {
    e.preventDefault();
    if (songerName !== "" && songerAge !== "") {
      let responsedata = await axios.post(
        "${process.env.REACT_APP_BACKEND_URL}/songer",
        {
          name: songerName,
          age: songerAge,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      );
    }

    props.getData();
    setaddSonger(false);
    setSongerName("");
    setSongerAge("");
    console.log(songersArray.data);
  }
  //delete--------------------------------------------------------------------------------------------
  async function deleteItem(id) {
    let response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/party/${id}`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    props.getData();
    setImagesArray(props.ImagesArray);
  }

  // عرض الفيديو--------------------------------------------------------------------------------------
  function showVideo(v1) {
    setvideoUpperDiv(true);
    setopenVideoSrc(v1);
  }
  // اغلاق الفيديو ------------------------------------------------------------------------------------
  function closeVideo(e) {
    setvideoUpperDiv(false);
  }

  return (
    <>
      {videoUpperDiv ? (
        <div className="upperAll">
          <div className="videoPlay">
            <video
              style={{ " object-fit": "contain" }}
              id="v1"
              src={openVideoSrc}
              width="100%"
              height="100%"
              controls
              autoPlay
            ></video>
            <i onClick={closeVideo} className="fas fa-window-close fa-2x"></i>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mainStyle ms-auto">
        <main>
          <Sidebar />
          <div class="content">
            <Navbar logOut={props.logOut} userInfo={props.userInfo} />
            <div className="container-fluid px-4 py-5">
              <div style={{ backgroundColor: "transparent" }} className="row ">
                {ImagesArray.map((imginfo, index) => (
                  <HomeItem
                    deleteItem={deleteItem}
                    ImagesArray={ImagesArray}
                    isAdmin={props.isAdmin}
                    imginfo={imginfo}
                    key={index}
                    getData={props.getData}
                    addToCart={props.addToCart}
                    token={props.token}
                  />
                ))}

                {props.isAdmin ? (
                  <div className="col-md-3 mb-4 mt-3">
                    {!add ? (
                      <button
                        onClick={showForm}
                        className="btn-primary p-2 rounded-3"
                      >
                        Add New Event
                      </button>
                    ) : (
                      <form
                        onSubmit={insertParty}
                        style={{
                          border: "1px solid #444",
                          borderRadius: "5px",
                        }}
                        className="text-center shadow-lg pt-3 px-3"
                      >
                        <input
                          onChange={getNameValue}
                          className="w-75 form-control mt-5 m-auto "
                          type="text"
                          placeholder="set the name"
                        />
                        <input
                          onChange={getDescValue}
                          className="w-75 form-control mt-2 m-auto"
                          type="text"
                          placeholder="set the description"
                        />
                        <input
                          onChange={getPriceValue}
                          className="w-75 form-control mt-2 m-auto"
                          type="text"
                          placeholder="set the price"
                        />
                        <input
                          onChange={getImageName}
                          className="w-75 form-control mt-2 m-auto"
                          type="text"
                          placeholder="set the image url"
                        />
                        <input
                          onChange={getCategory}
                          className="w-75 form-control mt-2 m-auto"
                          type="text"
                          placeholder="set category"
                        />
                        <button className=" btn-primary my-4 px-5 rounded-3 ">
                          Add
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="container-fluid px-4 py-5">
              <div style={{ backgroundColor: "transparent" }} className="row ">
                {songersArray.map((songer, index) => (
                  <SongerItem
                    deleteItem={deleteItem}
                    songersArray={songersArray}
                    isAdmin={props.isAdmin}
                    songer={songer}
                    key={index}
                    token={props.token}
                  />
                ))}

                {props.isAdmin ? (
                  <div className="col-md-3 mb-4 mt-3">
                    {!addSonger ? (
                      <button
                        onClick={showSongerForm}
                        className="btn-primary p-2 rounded-3"
                      >
                        Add New Songer
                      </button>
                    ) : (
                      <form
                        onSubmit={insertSonger}
                        style={{
                          border: "1px solid #444",
                          borderRadius: "5px",
                        }}
                        className="text-center shadow-lg pt-3 px-3"
                      >
                        <input
                          onChange={getSongerName}
                          className="w-75 form-control mt-5 m-auto "
                          type="text"
                          placeholder="set the name"
                        />
                        <input
                          onChange={getSongerAge}
                          className="w-75 form-control mt-2 m-auto"
                          type="number"
                          placeholder="set the age"
                        />
                        <button className=" btn-primary my-4 px-5 rounded-3 ">
                          Add
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
