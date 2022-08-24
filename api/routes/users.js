import express, { application } from "express"
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import {  verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//checkuser not used just for try
router.get("/checkauthentication",verifyToken,(req,res)=>{
    res.json("hello user logged in")
})

router.get("/checkuser/:id",verifyUser,(req,res)=>{
    res.send("hello user logged in and u cn delete now")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res)=>{
    res.send("hello user logged in and u cn delete all acounts")
})

//update
router.put("/:id", verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)

//get
router.get("/:id", verifyUser, getUser)

//getall
router.get("/", verifyAdmin, getUsers)

export default router