import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SongerItem(props) {
  const [inputs, setInputs] = useState(false);
  const [nameInputValue, setnameInputValue] = useState(props.songer.name);
  const [ageInputValue, setAgeInputValue] = useState(props.songer.age);
  const [itemObject, setitemObject] = useState({});
  const [token, settoken] = useState("");

  useEffect(() => {
    settoken(props.token);
    setitemObject(props.songer);
  }, props.songer);

  const setValue = (e) => {
    setnameInputValue(e.target.value);
    // console.log(nameInputValue);
  };

  const setagevalue = (e) => {
    setAgeInputValue(e.target.value);
    console.log(ageInputValue);
  };

  const updateSonger = async (id) => {
    let response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/songer/${id}`,
      { name: nameInputValue, age: ageInputValue },
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setitemObject(response.data);
    setInputs(!inputs);
  };

  const editSonger = () => {
    setInputs(!inputs);
  };

  // Delete Songer
  async function deleteItem(id) {
    let response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/songer/${id}`,
      { headers: { Authorization: `Bearer ${props.token}` } }
    );
    setitemObject(props.songer);
  }

  return (
    <div style={{ borderRadius: "10px" }} className="col-md-3 my-2">
      <div
        style={{ borderRadius: "10px" }}
        className="photo_container bg-light p-2 w-100 h-100 "
      >
        <div className="py-3">
          {/* input update */}
          <h2>Songer</h2>
          <h5>Name: {itemObject.name}</h5>
          <p style={{ lineHeight: "18px", fontSize: "15px" }}>
            Age: {itemObject.age}
          </p>
        </div>
        {/*  name //////////////////////////////////////////////////////////////////////////////////// */}
        <div>
          {inputs ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSonger(itemObject._id);
              }}
              className="justify-content-around mx-1 mt-1"
            >
              <input
                className=" form-control border-none mb-1"
                onChange={setValue}
                type="text"
                defaultValue={itemObject.name}
              />
              <input
                className=" form-control border-none mb-1"
                onChange={setagevalue}
                type="number"
                defaultValue={itemObject.age}
              />
              <button className="rounded-1 p-1 fw-bold bg-danger text-light border-0">
                change
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.isAdmin ? (
            <button
              onClick={editSonger}
              className="btn-secondary my-2 rounded-start rounded-end px-2"
            >
              Edit Songer
            </button>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between px-2">
            {props.isAdmin ? (
              <button
                onClick={() => deleteItem(itemObject._id)}
                className="bg-danger text-white px-2 rounded-3 fw-light"
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
