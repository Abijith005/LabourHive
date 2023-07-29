import mongoose from "mongoose";

const jobProfileSchema = mongoose.Schema({

    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    profilePic: {
        type: String,
        required: [true, 'Image is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    category: {
        type: String,
        required: [true, 'Category required']
    },

    expereince:{
        type:Number,
        required:[true,'Experience is required']
    },

    wage: {
        type:String,
        required:[true,'Wage is required']
    },

    selfDescription:{ 
        type:String,
        required:[true,'Self-description required']
    },

    workImages:{
        type:Array,
        default:[]
    },

    location:{
        type:String,
        required:[false,'Location is required']
    },

    coordiantes:{
        type:Array,
        required:[true,'Coordinate is required']
    },

    rating:{
        type:Number,
        default:0
    },

   
})

const jobProfileModel=mongoose.model('jobProfile',jobProfileSchema)
export default jobProfileModel