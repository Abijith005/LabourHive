import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },

    applicant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    applicationStatus:{
      type:String,
      enum:['accepted','rejected','pending'],
      default:'pending',
      required:[true, 'application status is required']
    }
  },
  { timestamps: true }
);

const apllicantModel=mongoose.model('applicant',applicantSchema)

export default apllicantModel
