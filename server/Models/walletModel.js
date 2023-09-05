import mongoose from "mongoose";
import userModel from "./userModel.js";

const walletSchema = new mongoose.Schema(
  {
    hire_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hiring",
      required: false,
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
    action: {
      type: String,
      enum: ["wage Transfer", "refund", "hire Payment",'withdrawal'],
      required: [true, "action is required"],
    },

    balance: {
      type: Number,
    },
    transaction: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
  },
  { timestamps: true }
);
// updating the balance field after taking the balance amount from user model using pre middle ware
walletSchema.pre("save", async function (next) {
  try {
    const amount = this.transaction === "credit" ? this.amount : -this.amount;
    const user = await userModel.findById(this.user_id).lean();
    if (!user) {
      throw new Error("User not found");
    }

    // Calculate the new balance based on the current wallet balance and the transaction
    this.balance = user.wallet + amount;

    next();
  } catch (error) {
    console.log("Error", error);
    next(error);
  }
});

walletSchema.post("save", async function (doc) {
  try {
    const amount = doc.transaction === "credit" ? doc.amount : -doc.amount;
    await userModel.updateOne(
      { _id: doc.user_id },
      { $inc: { wallet: amount } }
    );
  } catch (error) {
    console.log("Error", error);
  }
});

const walletModel = mongoose.model("wallet", walletSchema);
export default walletModel;
