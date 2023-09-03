import mongoose from "mongoose";

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

const walletModel=mongoose.model('wallet',walletSchema)
export default walletModel
