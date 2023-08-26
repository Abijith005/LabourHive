import mongoose from "mongoose";

const complaintSchema=new mongoose.Schema({
    hire_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'hiring',
        required:[true,'Hire_id id required']
    },
    complaintText:{
        type:String,
        required:[true,'Complaint is required']
    }
})

const complaintModel=mongoose.model('complaint',complaintSchema)
export default complaintModel