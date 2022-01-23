import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "./../Footer/Footer";
import axios from "axios";
import parksVideo from "./../../videos/VID-20211212-WA0014.mp4";
import posterVideo from "./../../Imgs/Screenshot 2021-12-21 081013.png";
import OiasisItems from "./OiasisItems";

export default function Oiasis(props) {
  const [ImagesArray, setImagesArray] = useState([]);
  const [videoUpperDiv, setvideoUpperDiv] = useState(false);
  const [openVideoSrc, setopenVideoSrc] = useState("");
  useEffect(() => {
    let parksArray = props.ImagesArray.filter(
      (element) => element.category == "oiasis"
    );
    setImagesArray(parksArray);
  }, [props.ImagesArray]);

  async function deleteItem(id) {
    let response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/${id}`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    props.getData();
    setImagesArray(props.ImagesArray);
  }

  //-----------------------------------------------------------------------------------------

  function showVideo(v1) {
    setvideoUpperDiv(true);
    setopenVideoSrc(v1);
  }

  function closeVideo(e) {
    setvideoUpperDiv(false);
  }

  //------------------------------------------------------------------------------------------
  return (
    <>
      {videoUpperDiv ? (
        <div className="upperAll">
          <div className="videoPlay">
            <video
              id="v1"
              autoPlay
              src={openVideoSrc}
              width="100%"
              height="100%"
              controls
              type="video/mp4"
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
          <div className="content">
            <Navbar logOut={props.logOut} />
            <div className="video2">
              <video
                className="w-100 h-100 "
                src={parksVideo}
                width="100%"
                height="220px"
                style={{ objectFit: "cover", borderRadius: "15px " }}
                poster={posterVideo}
                type="video/mp4"
              ></video>
              <i
                onClick={() => showVideo(parksVideo)}
                className="iconposter fas fa-play text-dark fa-3x"
              ></i>
            </div>
            <div className=" container-fluid px-4 py-5 ">
              <div style={{ backgroundColor: "transparent" }} className="row ">
                {ImagesArray.map((imginfo, index) => (
                  <OiasisItems
                    deleteItem={deleteItem}
                    isAdmin={props.isAdmin}
                    imginfo={imginfo}
                    index={index}
                    getData={props.getData}
                    addToCart={props.addToCart}
                    token={props.token}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
