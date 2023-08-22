import mongoose, { Schema } from "mongoose";

const hiringSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required:false
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: [true, "client_id is required"],
  },
  labour_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
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
  offeredWage:{
    type:Number,
    required:[false,'offerred wage is not mandatory']
  },
  hireStatus: {
    type: String,
    enum:['hired','cancelled','cancelRequested'],
    default:'hired'
  },
});

const hiringModel =  mongoose.model("hiring", hiringSchema);

export default hiringModel;
