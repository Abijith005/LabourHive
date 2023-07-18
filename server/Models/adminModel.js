import mongoose from "mongoose";


const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,['Email is required']]
    },
    
    password:{
        type:String,
        required:[true,['password is required']]
    }
})

 const adminModel=mongoose.model('admin',adminSchema)

 export default adminModel