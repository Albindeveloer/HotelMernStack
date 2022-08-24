import "./reserve.css"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import UseFetch from "../../hooks/UseFetch"
import { useState } from "react"
import { useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import { getTime } from "date-fns"
import axios from "axios"

function Reserve({setMod,hotelId}) {
  const [selectedRooms,setSelectedRooms] = useState([])

  const {data,loading,error}=UseFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext)

  //function to find dates between date range .simple logic
  const getDatesInRange = (startDate,endDate)=>{
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(startDate.getTime());
    
    const dates = [];

    while (date <= end){
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate()+1)
    }

    return dates;
  }
  
 const alldates = getDatesInRange(dates[0].startDate,dates[0].endDate);

 //check the rooms are available or not
  const isAvailable = (roomNo) =>{
    const isFound = roomNo.unavailableDates.some((date)=>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  }
  

  //select rooms
  const handleSelect= (e)=>{
    const checked= e.target.checked;
    const value= e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms,value] 
      : selectedRooms.filter((item)=> item !== value)  //unchecked caseil stateill nin vlue remove cheyn
    )
  };
  console.log(selectedRooms)

  //after select rooms reserve update unavailable dates
  const handleClick= async() =>{
    try{
      console.log("dates",alldates)
      await Promise.all(selectedRooms.map((room)=>{
        return(
        axios.put(`/rooms/availability/${room}`,{dates:alldates})
        )
      }))
      setMod(false)   //to close  modal

    }catch(err){
      
    }

  }

  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="rClose"
                onClick={()=>{
                    setMod(false)
                }}
            />
            <span>Select your romms💒 :</span>
            {loading? ("loading") 
            : data?.map(item=>{
              return(
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                  <div className="rPrice">${item.price}</div>

                  <div className="rSelectedRooms">
                  {item.roomNumber.map((roomNo)=>{
                    return(
                    <div className="room">
                      <label>{roomNo.number}</label>
                      <input className="rCheckbox" type="checkbox" 
                      value={roomNo._id} 
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNo)}></input>
                    </div>
                    )
                  })}
                  </div>
                </div>
              </div>
              )
            })}

            {data?.length ? <button onClick={handleClick} className="rButton">Reserve Now</button> : <h1>No rooms 🔐</h1> }
        </div>
    </div>
  )
}

export default Reserve