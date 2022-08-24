import { createError } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token= req.cookies.access_token
    if(!token){ 
        return next(createError(400,"user not authenticated"));
    }

    jwt.verify(token,process.env.JWT, (err,user)=>{     //if token valid , it gives a response I gonna named it as user ,this reaponse is come from our token assigned when login contains id and isAdmin
        if(err) return next(createError(404,"token is not valid"))

        req.user = user;    //send the response it to a req.anyname,
        console.log("fetr check uth",req.user) 
        next()
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        console.log("token id is",req.user.id)
        console.log(req.params.id)
        if(req.user.id === req.params.id || req.user.isAdmin){
            console.log("if same",req.user.id)
            console.log("if same",req.user.isAdmin)
            next()
        }
        else{
            return next(createError(403,"you are not autherised"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            console.log("admin or not",req.user.isAdmin)
            next()
        }
        else{
            return next(createError(403,"you are not autherised"))
        }
    })
}