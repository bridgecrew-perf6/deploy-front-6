import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";
import axios from "axios";
import { array } from "joi";

export default function Cart(props) {
  let [cartItems, setcartItems] = useState([]);
  let [uniqeItems, setuniqeItems] = useState([]);
  const [cartArray2, setcartArray2] = useState([]);
  const [fullSallary, setfullSallary] = useState(0);
  useEffect(async () => {
    let responseData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/reservation/${props.userEmail}`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setcartArray2(responseData.data);
  }, []);
  useEffect(() => {
    let newfullSallary = 0;
    for (let i = 0; i < cartArray2.length; i++) {
      newfullSallary = newfullSallary + cartArray2[i].price;
      setfullSallary(newfullSallary);
    }

    cartArray2.forEach((item) => {
      let count = 1;
      cartArray2.forEach((x) => {
        if (
          item._id == x._id &&
          cartArray2.indexOf(item) != cartArray2.indexOf(x)
        ) {
          count++;
        }
      });
      let i = {
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        img: item.img_url,
        itemsCount: count,
      };
      cartItems.push(i);
    });

    console.log(cartItems);
    uniqeItems = [
      ...cartItems
        .reduce((map, obj) => map.set(obj.id, obj), new Map())
        .values(),
    ];

    setuniqeItems(uniqeItems);
  }, [cartArray2]);
  //----------------------------------------

  async function deleteItemCart(id) {
    let response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/calcelReservation/${id}`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    window.location.reload();

  }

  //----------------------------------------
  return (
    <>
      <div className="mainStyle ms-auto">
        <Navbar logOut={props.logOut} userInfo={props.userInfo} />
        <div className="container-fluid px-4 py-5">
          <div className="row">
            {uniqeItems.length > 0
              ? uniqeItems.map((item, index) => (
                  <div
                    key={index}
                    style={{ borderRadius: "10px" }}
                    className="col-md-3 my-2"
                  >
                    <div
                      style={{ borderRadius: "10px" }}
                      className="photo_container bg-light p-2 w-100 h-100 "
                    >
                      <img
                        style={{ borderRadius: "5px", height: "150px" }}
                        src={item.img}
                        className="w-100 "
                        alt="not found"
                      />
                      <div className="py-3">
                        <h4>{item.name}</h4>
                        <p style={{ lineHeight: "18px", fontSize: "15px" }}>
                          {item.description}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between px-2">
                        <span className="badge bg-success pt-2">
                          $ {item.price} SR{" "}
                        </span>
                        <div>
                          {" "}
                          <button
                            onClick={() => deleteItemCart(item.id)}
                            className="btn bg-danger fw-bold p-1"
                          >
                            {" "}
                            delete
                          </button>
                        </div>
                      </div>
                      <div>Count: {item.itemsCount}</div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <h1>{fullSallary}</h1>
        <Footer />
      </div>
    </>
  );
}
