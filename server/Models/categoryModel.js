import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ['Name is required']]
    },
    basicWage: {
        type: Number,
        required: [true, ['Number is required']]
    },
    vectorImage: {
        type: String,
        required: [true, 'Image is required']
    },
    subImage:{
        type:String,
        required: [true, 'subImage is required']
    },
    blockStatus: {
        type: Boolean,
        default: false
    }
})

const categoryModel = mongoose.model('category', categorySchema)
export default categoryModel