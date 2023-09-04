import mongoose from "mongoose";
import userModel from "./userModel.js";

const walletSchema = new mongoose.Schema({
  hire_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hiring",
    required: [true, "hire_id is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Labour_id is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  transaction: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
},
{timestamps:true});

walletSchema.post('save',async function (doc){
    try {
        const amount=doc.transaction==='credit'?doc.amount:-(doc.amount)
        await userModel.updateOne({_id:doc.user_id},{$inc:{wallet:amount}})
    } catch (error) {
        console.log("Error",error);
    }
})

const walletModel=mongoose.model('wallet',walletSchema)
export default walletModel
