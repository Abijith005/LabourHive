import mongoose from "mongoose";

const chatMemberSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:[true,'user_id is required']
    },
    members:{
        type:Array,
        default:[]
    }
})

const chatMembersModel=new mongoose.model('chatMembers',chatMemberSchema)