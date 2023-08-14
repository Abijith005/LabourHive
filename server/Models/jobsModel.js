import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  category: {
    type: String,
    required: [true, "category is required"],
  },

  experience:{
    type:String,
    required:[true,'experience is required']
  },

  wage:{
    type:String,
    required:[true,'wage is required']
  },
  
  requiredCount: {
    type: Number,
    required: [true, "required count is required"],
  },

  postDate: {
    type: String,
    default:new Date()
  },

  startDate: {
    type: Date,
    required: [true, "work date from is required"],
  },

  endDate: {
    type: Date,
    required: [true, "work date to is required"],
  },

  location: {
    type: String,
    required: [true, "location is required"],
  },

  coordinates: {
    type: Array,
    required: [true, "coordinates is required"],
  },

  currentStatus: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
});

const jobsModel =  mongoose.model("jobs", jobsSchema);
export default jobsModel;
