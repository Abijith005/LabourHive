import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'category'
  },

  experience:{
    type:String,
    required:[true,'experience is required']
  },

  wage:{
    type:Number,
    required:[true,'wage is required']
  },
  
  requiredCount: {
    type: Number,
    required: [true, "required count is required"],
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

  jobDescription:{
    type:String,
    required:[true,'Job description']
  },

  coordinates: {
    type: Array,
    required: [true, "coordinates is required"],
  },

  currentStatus: {
    type: String,
    enum: ["active", "expired","completed"],
    default: "active",
  },

  postedJob:{
    type:Boolean,
    default:true
  }
},
{
  timestamps:true
});

const jobsModel =  mongoose.model("jobs", jobsSchema);
export default jobsModel;
