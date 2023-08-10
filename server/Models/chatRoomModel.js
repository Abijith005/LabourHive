import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps:true
})

const chatRoomModel =  mongoose.model('chatRoom', chatRoomSchema)
export default chatRoomModel