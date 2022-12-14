import express, { application } from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//create
router.post("/", verifyAdmin, createHotel)

//update
router.put("/:id", verifyAdmin, updateHotel)

//delete
router.delete("/:id",verifyAdmin, deleteHotel)

//get
router.get("/find/:id",getHotel)

//getall
router.get("/",getHotels)   // we used this endpoint in featured Hotels, search in header,search in list also😎, its modified by query
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)
export default router