import mongoose from "mongoose";
import walletModel from "./walletModel.js";

const withdrawSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user_id is required"],
    },

    amount: {
      type: Number,
      required: [true, "amount is required"],
    },

    accountHolder: {
      type: String,
      required: [true, "Account holder is required"],
    },

    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
    },

    ifscCode: {
      type: String,
      required: [true, "IFSC code is required"],
    },
    status: {
      type: String,
      enum: ["requested", "approved", "rejected"],
      default: "requested",
    },
  },
  { timestamps: true }
);

// pre-save middleware to handle status change to 'approved'

withdrawSchema.pre("save", async function (next) {
    if (this.status === "approved") {
        try {
      await walletModel.create({
        user_id: this.user_id,
        amount: this.amount,
        action: "withdrawal",
        transaction: "debit",
      });
      next()
    } catch (error) {
      console.error("Error", error);
      next(error)
    }
  } 
  next()
});

const withdrawModel = mongoose.model("withdraw", withdrawSchema);
export default withdrawModel;
