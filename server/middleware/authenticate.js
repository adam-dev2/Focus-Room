import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express'
const app = express();

export const authenticate = (req,res,next) => {
    try{
        if(req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }
    }catch(err){
        console.log(err);
        return res.status(401).json({message:'Unauthorized access'});
    }
}