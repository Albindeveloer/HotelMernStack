import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import UseFetch from "../../hooks/UseFetch";
import axios from "axios";

const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [info,setInfo] = useState({});
  const [hotelId,setHotelId] = useState();
  const [roomNo,setRoomNo] = useState([]);

  console.log(roomNo && roomNo)

  const {data,loading,error} = UseFetch("/hotels");

  const handleChange = (e) =>{
    setInfo({...info, [e.target.id] : e.target.value})
  }

  const handleClick = async(e) =>{
    e.preventDefault();

    const roomNumbers = roomNo.split(",").map((room)=> ({number : room}))         // [{number : 102 , unavilbledates:[]}, {number :103 , unvilabledates:[]}]
    console.log(roomNumbers)
    try{
      await axios.post(`/rooms/${hotelId}`, {...info,roomNumbers})

    }catch{

    }

  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>rooms</h1>
        </div>
        <div className="bottom">
        
          <div className="right">
            <form>
              

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}

                <div className="selectHotel">
                  <label>Hotels</label>
                  <select onChange={(e)=>{setHotelId(e.target.value)}} >
                    {
                      loading ? " loading" :
                      data && data.map(hotel=>(
                        <option value={hotel._id}>{hotel.name}ffw</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label>Room Numbers</label>
                  <input type="text" placeholder="keep , between each roomNo" onChange={(e)=>{setRoomNo(e.target.value)}}></input>
                </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
