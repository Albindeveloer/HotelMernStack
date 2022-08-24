import express, { application } from "express"
import { createRoom, deleteRoomFromAllHotels, deleteRoomSpecificHotel, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//create
router.post("/:hotelid", verifyAdmin, createRoom)   

//update
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

//delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoomSpecificHotel)  //only delete from tht hotel
router.delete("/:id",verifyAdmin, deleteRoomFromAllHotels)  // delete from room collection  nd  all hotels

//get
router.get("/:id",getRoom)

//getall
router.get("/",getRooms)



export default router