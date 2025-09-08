const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')

const app = express();
const PORT =  5001;
import User from './models/User';

app.use(bodyParser.json());


app.post('/api/auth/sign-in',async(req,res) => {
    const {fullName,email,password} = req.body;
    if(!fullName || !email || !password) {
        return res.status(400).json({message: 'All the details are required'});
    }
    try {
        const findUser = await User.find({email})
        if(findUser) {
            return res.status(400).json({message: 'email already exists'})
        } 
        const hashedPassword = bcrypt.hash(password,10);
        const newUser = new User({fullName,email,password:hashedPassword})

        await newUser.save();
        return res.status(201).json({message: `User registered Successfully`,fullName,email})
    }catch(err) {
        return res.status(500).json({message: `Something went wrong while perform sign-in ${err}`})
    }
})

app.get('/',(req,res) => {
    res.status(200).json({message: 'Server is good'});
})

app.listen(PORT,() => {
    console.log(`Server listetnig at ${PORT}`)
})