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

  postDate: {
    type: String,
    required: [true, "post date is required"],
  },

  workDateFrom: {
    type: Date,
    required: [true, "work date from is required"],
  },

  workDateTo: {
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

  requiredCount: {
    type: Number,
    required: [true, "required count is required"],
  },

  currentStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const jobsModel =  mongoose.model("jobs", jobsSchema);
export default jobsModel;
