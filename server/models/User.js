import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    avatar:String
},{timestamps: true})

export default mongoose.model('User', userSchema);
