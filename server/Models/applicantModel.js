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
  },
  { timestamps: true }
);

const apllicantModel=mongoose.model('applicant',applicantSchema)

export default apllicantModel
