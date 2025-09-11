import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    userID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true
    }
})


export default mongoose.model('Code',codeSchema);