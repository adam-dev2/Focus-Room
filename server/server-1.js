import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import './passport.js';
import passport from "passport";
import cors from 'cors';
import dotenv from 'dotenv';
import Code from "./models/Code.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json())

app.use(session({
    secret: 's3cr3tk3y',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName:"sessions"
    }),
    cookie:{maxAge: 1000*60*60*24}
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),
    (req,res) => {
        res.redirect("http://localhost:5173/googledashboard");
    }
)

app.get('/auth/user',(req,res) => {
    try{
        if(req.isAuthenticated()) {
            res.json(req.user)
        }else {
            return res.status(401).json({message: 'Not authenticated'})
        }
    }catch(err) {
        return res.status(500).json({message:`Error while fetching user ${err}`});
    }
})

app.get('/auth/logout',(req,res) => {
    req.logOut(() => {
        res.clearCookie('connect.sid');
        res.redirect(process.env.CLIENT_URI);
    })
})

app.post('/api/code-snippet',async(req,res) => {
    const {code,language,name} = req.body;
    try{
        let findCode = await Code.findOne({name});
        if(!findCode){
            findCode = new Code({code,language,name});
            await findCode.save();
            return res.status(201).json({message: `Code snippet saved successfully ${name}`});
        }
        return res.status(400).json({message: `Code snippet with this name already exists`});

    }catch(err) {
        return res.status(500).json({message: `Internal Server Error: ${err}`});
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})