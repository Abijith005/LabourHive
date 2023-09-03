import mongoose from "mongoose";
import hiringModel from "../Models/hiringModel.js";

export const getHirings = async (req, res) => {
  try {
    const { job_id } = req.query;

    const pipeline = [
      { $match: { job_id: new mongoose.Types.ObjectId(job_id) } },
      {
        $lookup: {
          from: "users",
          localField: "labour_id",
          foreignField: "_id",
          as: "labour",
        },
      },
      { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "jobs",
          localField: "job_id",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "complaints",
          localField: "_id",
          foreignField: "hire_id",
          as: "complaint",
        },
      },
      { $unwind: { path: "$complaint", preserveNullAndEmptyArrays: true } },

      {
        $project: {
          _id: 1,
          hiringDate: 1,
          category: 1,
          totalDays: 1,
          location: 1,
          totalAmount: 1,
          hireStatus: 1,
          paymentToLabour:1,
          "labour.name": 1,
          "labour._id": 1,
          "job._id": 1,
          "job.currentStatus": 1,
          "complaint._id": 1,
          "complaint.complaintText": 1,
        },
      },
    ];
    const hireDatas = await hiringModel.aggregate(pipeline);
    console.log(hireDatas,'hiredatassssssssssssssss');
    res.json(hireDatas);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

