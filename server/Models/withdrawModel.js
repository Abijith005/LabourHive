import mongoose, { Schema } from "mongoose";

const withdrawSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'user_id is required']
    },

    amount:{
        type:Number,
        required:[true,'amount is required']
    },

    accountHolder:{
        type:String,
        required:[true,'Account holder is required']
    },
    
    accountNumber:{
        type:String,
        required:[true,'Account number is required']
    },

    ifscCode:{
        type:String,
        required:[true,'IFSC code is required']
    },
    

})

const withdrawModel=mongoose.model('withdraw',withdrawSchema)
export default withdrawModel