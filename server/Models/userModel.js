import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user name is required']
    },

    email: {
        type: String,
        required: [true, 'email is required']
    },

    mobileNumber: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: false
    },

    profilePicture: {
        type:String,
        required:false
    },

    blockStatus:{
        type:Boolean,
        default:false
    },

    googleLogin:{
        type:Boolean,
        required:[true,'google login status is required']
    },

   

 
})

const userModel = mongoose.model('user', userSchema)

export default userModel