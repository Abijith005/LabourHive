import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatRoom_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatRoom'
    },

    user_id:{
        type:String,
        required:[true,'receiver _id is required']
    },
    message:{
        type:String,
        required:[true,'message is required']
    },
    
},
{
    timestamps:true
}
)

const messageModel= mongoose.model('message',messageSchema)
export default messageModel