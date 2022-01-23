import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeItem(props) {
  const [descriptionInput, setdescriptionInput] = useState(false);
  const [priceInput, setpriceInput] = useState(false);
  const [newDesc, setnewDesc] = useState("");
  const [newPrice, setnewPrice] = useState("");

  const [itemObject, setitemObject] = useState({});
  const [token, settoken] = useState("");

  useEffect(() => {
    settoken(props.token);
    setitemObject(props.imginfo);
  }, []);

  const show = () => {
    setdescriptionInput(!descriptionInput);
    setpriceInput(!priceInput);
  };
  const setdescValue = (e) => {
    setnewDesc(e.target.value);
    console.log(newDesc);
  };
  const setPriceValue = (e) => {
    setnewPrice(e.target.value);
    console.log(newPrice);
  };

  const updateItem = async (id) => {
    let response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/party/${id}`,
      { description: newDesc, price: newPrice },
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setitemObject(props.imginfo);
    show();
  };

  return (
    <div style={{ borderRadius: "10px" }} className="col-md-3 my-2">
      <div
        style={{ borderRadius: "10px" }}
        className="photo_container bg-light p-2 w-100 h-100 "
      >
        <img
          style={{ borderRadius: "5px", height: "150px" }}
          src={itemObject.img_url}
          className="w-100 "
          alt="not found"
        />
        <div className="py-3">
          {/* input update */}
          <div>
            {descriptionInput ? (
              <form className="d-flex justify-content-around mx-1 mt-1">
                <input
                  className=" form-control border-none "
                  onChange={setdescValue}
                  type="text"
                  defaultValue={itemObject.description}
                />
              </form>
            ) : (
              ""
            )}
          </div>
          <h4>{itemObject.name}</h4>
          <p style={{ lineHeight: "18px", fontSize: "15px" }}>
            {itemObject.description}
          </p>
        </div>
        {/*  price //////////////////////////////////////////////////////////////////////////////////// */}
        <div>
          {priceInput ? (
            <form className="d-flex justify-content-around mx-1 mt-1">
              <input
                className=" form-control border-none "
                onChange={setPriceValue}
                type="text"
                defaultValue={itemObject.price}
              />
            </form>
          ) : (
            ""
          )}
          <button
            onClick={() => updateItem(itemObject._id)}
            className="rounded-1 my-2 p-1 fw-bold bg-danger text-light border-0"
          >
            {" "}
            change{" "}
          </button>
        </div>
        <div className="d-flex justify-content-between px-2">
          <span className="badge bg-success pt-2">
            $ {itemObject.price} SR{" "}
          </span>
          {props.isAdmin ? (
            <button
              onClick={() => props.deleteItem(itemObject._id)}
              className="bg-danger text-white px-2 rounded-3 fw-light"
            >
              Delete
            </button>
          ) : (
            <i
              onClick={() => props.addToCart(itemObject._id)}
              className="fas fa-cart-plus fs-4 text-danger"
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}
