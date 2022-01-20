import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Game.css";
import ReactStars from "react-rating-stars-component";
import { TiDelete } from "react-icons/all";
import { FaRegComment } from "react-icons/all";
import {GrUpdate} from 'react-icons/gr'

export default function Game({ token, admin }) {
  const [game, setGame] = useState(null);
  const [user, setUser] = useState([]);
  const [input, setInput] = useState("");
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [extraImg, setExtraImg] = useState("");
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(async () => {
    if (token) {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/game/${id}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setGame(result.data);
    }
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    try {
      console.log(result.data, "user hereeee");
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);
  const changeComment = (e) => {
    setInput(e.target.value);
  };
  const addComment = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/comment/${id}`,
        {
          comment: input,
          rating: rating,
        },
        { headers: { authorization: "Bearer " + token } }
      );
      setGame({ ...game, comment: result.data.comment });
    } catch (err) {
      console.log(err);
    }
  };
  const deletecomment = async (comment) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/comment/${id}`,
        { comment: comment, rating: rating },
        { headers: { authorization: "Bearer " + token } }
      );
      console.log(result.data);
      setGame({ ...game, comment: result.data.comment });
    } catch (err) {
      console.log(err.res.data, "error");
    }
  };
  const ratingChanged = (e) => {
    setRating(e.target.value);
  };

  const updateName = (e) => {
    setname(e.target.value);
  };
  const updateInputImg = (e) => {
    setimg(e.target.value);
  };
  const updatedec = (e) => {
    setDescription(e.target.value);
  };
  const updateInputvideo = (e) => {
    setVideo(e.target.value);
  };

  const updateGame = async (id) => {
    const result = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/game/${id}`,
      {
        name,
        description,
        img,
        video,
      },
      { headers: { authorization: "Bearer " + token } }
    );
    setGame(result.data);
  };
  //
  const changeExtraImg = (e) => {
    setExtraImg(e.target.value);
  };
  //
  const addExtraImg = async () => {
    try {
      console.log(extraImg, id, "hiji");
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/img/${id}`,
        { img: extraImg },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setGame({ ...game, img: result.data.extraImg });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <div className="Gamediv">
      {game ? (
        <div>
          <p>{game.name}</p>
          <p>{game.description}</p>
          <img className="imgGame" src={game.img} alr="no img" alt="" />
          <br />
          {/*  eslint-disable-next-line */}
          <iframe src={game.video} className="video1" frameborder="0"></iframe>
          <br />
          <div className="extraImgessGame">
            {game.extraImg.map((element) => {
              return (
                // console.log(element);
                <div className="divExtraIMG">
                  <img className="extraImgGame" src={element} alt="" />
                </div>
              );
            })}
          </div>
          <div className="divAddCommentAndReating">
            <input
              className="inputComment"
              placeholder="comment"
              onChange={(e) => {
                changeComment(e);
              }}
              type="text"
            />
            <FaRegComment
              className="buttonComment"
              onClick={() => {
                addComment();
              }}
            />
            <br />
            <select
              id="cars"
              name="cars"
              onChange={(e) => {
                ratingChanged(e);
              }}
            >
              <option value="0">Rate:</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

            <div className="commentsCont">
              {game.comment.map((elm, i) => {
                return (
                  <div key={i}>
                    <p> {elm.userName}</p>
                    <p>{elm.comment}</p>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      ratingValue={rating}
                      size={24}
                      value={elm.rating}
                      activeColor="#ffd700"
                    />
                    {/* eslint-disable-next-line*/}
                    {elm.userId == user._id ? (
                      <TiDelete
                        onClick={() => {
                          deletecomment(elm.comment);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            {/* eslint-disable-next-line*/}
            {user.admin == true ? (
              <div className="adminDiv">
                <input
                  className="inputProfile"
                  type="text"
                  placeholder="new name"
                  onChange={(e) => {
                    updateName(e);
                  }}
                />
                <br />
                <input
                  className="inputProfile"
                  type="text"
                  placeholder="new img "
                  onChange={(e) => {
                    updateInputImg(e);
                  }}
                />
                <br />
                <input
                  className="inputProfile"
                  type="text"
                  placeholder="new dec"
                  onChange={(e) => {
                    updatedec(e);
                  }}
                />
                <br />
                <input
                  className="inputProfile"
                  type="text"
                  placeholder="new video "
                  onChange={(e) => {
                    updateInputvideo(e);
                  }}
                />
                <br />
                <GrUpdate
                  className="buttonUpdate"
                  onClick={() => {
                    updateGame(game._id);
                  }}
                />

                <br />

                <div>
                  <input
                    type="text"
                    className="input"
                    placeholder="extraImg"
                    onChange={(e) => {
                      changeExtraImg(e);
                    }}
                  />
                  <br />
                  <button
                    onClick={() => {
                      addExtraImg();
                    }}
                    className="add"
                  >
                    {" "}
                    Add ExtraImg
                  </button>
                  {/* <img src={game.extraImg} alt="" /> */}
                </div>
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
