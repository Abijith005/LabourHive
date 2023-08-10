import mongoose, { Schema } from "mongoose";

const hiringSchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: false,
  },
  client_id: {
    type: String,
    required: [true, "client_id is required"],
  },
  labour_id: {
    type: Array,
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
  labourCount: {
    type: Number,
    default: 1,
  },
});

const hiringModel =  mongoose.model("hiring", hiringSchema);

export default hiringModel;
