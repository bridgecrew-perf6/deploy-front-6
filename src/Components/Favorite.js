import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./like.css"

export default function Favorite({token}) {
  const [like, setLike] = useState([]);
  const history = useHistory();
  // const {id}=useParams();
  /////////////////////////////////////
  // eslint-disable-next-line
  useEffect(async () => {
    if (token) {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Like`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log(res.data);
      setLike(res.data);
    }
    // eslint-disable-next-line
  }, []);
  const deleteLike = async (id, i) => {
    // eslint-disable-next-line
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/Like/${id}`,
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    const coppyDelete = [...like];
    coppyDelete.splice(i, 1);
    setLike(coppyDelete);
  };
  const gotGame = (id) => {
    history.push(`/Game/${id}`);
  };
  //
  return (
    <div className="divLike">
      {like.map((elm, i) => {
        console.log(elm);
        return (
          <div>
            <div key={i}>
              <p>{elm.name}</p>
              {/* eslint-disable-next-line */}
              <img
                className="imgLike"
                src={elm.img}
                alr="no img"
                onClick={() => {
                  gotGame(elm._id);
                }}
              />
            </div>
            <br />
            <button
              onClick={() => {
                deleteLike(elm._id, i);
              }}
            >
              remove like
            </button>
          </div>
        );
      })}
    </div>
  );
}
