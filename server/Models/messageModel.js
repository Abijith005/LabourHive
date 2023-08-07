import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required:[true,'sender_id is required']
    },

    receiver_id:{
        type:String,
        required:[true,'receiver _id is required']
    },
    message:{
        type:String,
        required:[true,'message is required']
    }
})

const messageModel=new mongoose.model('message',messageSchema)
export default messageModel