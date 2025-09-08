import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,(err)=>{
        if(err) {
            console.log('Error while connecting DB');
        } else {
            console.log("connected DB successfully");
        }
    })
}

export default connectDB;