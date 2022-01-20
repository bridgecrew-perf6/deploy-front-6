import React,{useState} from 'react';
import axios from 'axios';
import "./postGame.css"
export default function PostGame({token}) {
    const [game, setGame] = useState([]);
    const [name, setname] = useState("");
    const [img, setimg] = useState("");
  
    const [video, setVideo] = useState('');
    const [description, setDescription] = useState('');

    const changeName=(e)=>{
        setname(e.target.value)
      }
      const changeImg=(e)=>{
        setimg(e.target.value)
      }


      const changeVideo=(e)=>{
        setVideo(e.target.value)
      }
      const changeDescription=(e)=>{
        setDescription(e.target.value)
      }
      //
      const addGame=async()=>{
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/games`,{name, description, img, video},{
          headers: { authorization: "Bearer " + token },
        })
        const copyArray=[...game]
        copyArray.push(result.data)
        setGame(copyArray)
      }
     
    return (
        <div className='divPostGame'>
         <input type="text" className='input' placeholder='Name' onChange={(e)=>{changeName(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Img' onChange={(e)=>{changeImg(e)}}/>
          <br/>
          <br/>
          <input type="text" className='input' placeholder='Desc' onChange={(e)=>{changeDescription(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Video' onChange={(e)=>{changeVideo(e)}}/>
          <br/>
          <button onClick={()=>{addGame()}} className='addGame'>add game</button>
       

          <br/>
        </div>
    )
}
