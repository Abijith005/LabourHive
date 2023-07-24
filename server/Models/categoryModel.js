import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,['Name is required']]
    },
    basicWage:{
        type:Number,
        required:[true,['Number is required']]
    },
    vectorImage:{
        type:Object,
        required:[true,'Image is required']
    }
})

const categoryModel=mongoose.model('category',categorySchema)
export default categoryModel