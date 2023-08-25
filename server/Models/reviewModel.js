import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    client_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'Client_id is required']
    },
    labour_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'Labour_id is required']
    },
    hire_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'hiring',
        required:[true,'hire_id is required']
    },
    reviewText:{
        type:String,
        required:[true,'reviewText is required']
    },
    rating:{
        type:Number,
        required:[true,'rating is required']
    }
},
{
    timestamps:true
}
)
const reviewModel=mongoose.model('review',reviewSchema)
export default reviewModel