import mongoose, { Schema } from "mongoose";
import scheduleModel from "./scheduleModel.js";

const hiringSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobs",
    required: false,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "client_id is required"],
  },
  labour_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "labour_id is required"],
  },
  hiringDate: {
    type: Date,
    required: [true, "hiring date is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  totalDays: {
    type: Number,
    required: [true, "total days required"],
  },
  startDate: {
    type: Date,
    required: [true, "startDate is required"],
  },
  endDate: {
    type: Date,
    required: [true, "endDate is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  coordinates: {
    type: Array,
    required: [true, "coordinates is required"],
  },
  totalAmount: {
    type: Number,
    required: [true, "totalAmount is required"],
  },
  offeredWage: {
    type: Number,
    required: false,
  },
  hireStatus: {
    type: String,
    // enum: ["hired", "cancelled", "cancelRequested"],
    enum: ["hired", "cancelled_client","cancelled_labour", "cancelRequested_client","cancelRequested_labour"],
    default: "hired",
  },
  paymentToLabour:{
    type:String,
    enum:['pending','rejected','approved'],
    default:'pending'
  }
});

// adding the work date to the labour schedule model by post middleware
hiringSchema.post("save", async function (doc) {
  try {
    // getting number of days
    const days = Math.floor(
      (doc.endDate - doc.startDate) / (24 * 60 * 60 * 1000)
    );
    // creating a new array contains dates and hire_id
    const dates = Array.from({ length: days + 1 }, (_, index) => {
      const currentDate = new Date(doc.startDate);
      // setting date based on index and start date of work
      currentDate.setDate(this.startDate.getDate() + index);
      return { date: currentDate, hire_id: doc._id };
    });

   await scheduleModel.updateOne(
      { user_id: doc.labour_id },
      { $push: { weekSchedule: { $each: dates } } },
      { upsert: true },
      { new: true }
    );
  } catch (error) {
    console.log("Error", error);
  }
});

const hiringModel = mongoose.model("hiring", hiringSchema);

export default hiringModel;
