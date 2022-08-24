import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register=async(req,res,next)=>{
    try{

        //to hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser=new User({
            // username:req.body.username,
            // email:req.body.email,
            ...req.body,
            password:hash
        })

        await newUser.save();
        res.status(200).send("user hs been created")
    }catch(err){
        next(err)
    }

}

export const login=async(req,res,next)=>{
    console.log(req.body.username,req.body.password)
    try{

        const user= await User.findOne({username: req.body.username});
        console.log(user)
        if(!user) return next(createError(404,"user not found"))

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password );
        if(!isPasswordCorrect) return next(createError(400,"wrong password or username"))

        //generate to jwt token using id and isAdmin and store the token in cookie
        const token = jwt.sign({ id:user._id , isAdmin:user.isAdmin }, process.env.JWT);  

        const {password,isAdmin,...otherDetails}=user._doc
        
        res.cookie("access_token",token,{
            httpOnly:true

        }).status(200).json({details:{...otherDetails},isAdmin})
    }catch(err){
        next(err)
    }

}