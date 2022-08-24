import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"


export const createRoom = async(req,res)=>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try{
        const savedRoom =await newRoom.save()

        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms: savedRoom._id}})  //not $set method

        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)

    }catch(err){
        next(err)
    }
}

export const updateRoom=async(req,res,next)=>{
    try{
        const updateRoom= await Room.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new: true}
        );
        res.status(200).json(updateRoom)

    }catch(err){
        next(err)
    }
}

export const updateRoomAvailability=async(req,res,next)=>{
    try{
        const urd=await Room.updateOne(
            {"roomNumber._id": req.params.id},
            {
                $push:{
                    "roomNumber.$.unavailableDates": req.body.dates   
                }
            }
        )
        console.log(urd)
        res.status(200).json("room has been updated")

    }catch(err){
        next(err)
    }
}

//delete the room ust from the hotel, not from room collection
export const deleteRoomSpecificHotel=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
   
    try{
        await Room.findByIdAndDelete(req.params.id);

        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms : req.params.id}})
            console.log("rooms deleted from hotel also")

        }catch(err){

        }
        res.status(200).json("Room deleted")
    }catch(err){
        next(err)
    }
}

export const getRoom=async(req,res,next)=>{
    try{
        const room=await Room.findById(req.params.id);
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}

export const getRooms=async(req,res,next)=>{
    try{
        const rooms=await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        next(err)
    }
}

//delete room , so we hve to delete the room from all hotels lso
export const deleteRoomFromAllHotels=async(req,res,next)=>{
    
   //find hotel include the room
   
   try{
       await Room.findByIdAndDelete(req.params.id);
       
       try{
           await Hotel.updateMany({room:req.params.id},{$pull: {rooms : req.params.id}})    //delete rooms from all hotels which contins tht rooms 

            }catch(err){
    
            }
        res.status(200).json("Room deleted")
    }catch(err){
        next(err)
    }
}