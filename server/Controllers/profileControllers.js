import mongoose from "mongoose";
import { verifyToken } from "../Helpers/jwtVerify.js";
import hiringModel from "../Models/hiringModel.js";
import reviewModel from "../Models/reviewModel.js";
import jobProfileModel from "../Models/jobProfileModel.js";
import complaintModel from "../Models/complaintModel.js";

export const getProfileHistory = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const pipeline = [
      { $match: { client_id: new mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "hire_id",
          as: "review",
        },
      },
      { $unwind: {path:"$review",preserveNullAndEmptyArrays:true }},
      {
        $lookup: {
          from: "users",
          localField: "labour_id",
          foreignField: "_id",
          as: "labour",
        },
      },
      { $unwind: "$labour" },
      {
        $lookup: {
          from: "jobs",
          localField: "job_id",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $lookup: {
          from: "complaints",
          localField: "_id",
          foreignField: "hire_id",
          as: "complaint",
        },
      },
      {
        $unwind: { path: "$complaint", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          hiringDate: 1,
          category: 1,
          startDate: 1,
          totalDays: 1,
          totalAmount: 1,
          hireStatus: 1,
          "review._id": 1,
          "labour._id": 1,
          "labour.name": 1,
          "job._id": 1,
          "job.currentStatus": 1,
          "complaint._id": 1,
        },
      },
    ];
    const data = await hiringModel.aggregate(pipeline);
    res.json({ success: true, data });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const postReview = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const {_id}=await reviewModel.create({ client_id: user_id, ...req.body });
    const pipeline = [
      {
        $match: { labour_id: new mongoose.Types.ObjectId(req.body.labour_id) },
      },
      { $group: { _id: null, totalRating: { $avg: "$rating" } } },
    ];
    const rating = await reviewModel.aggregate(pipeline);
    await jobProfileModel.updateOne(
      { user_id: req.body.labour_id },
      { $set: { rating: rating.totalRating } }
    );

    res.json({ success: true, message: "Successfully posted labour review",review_id:_id});
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const postComplaint = async (req, res) => {
  try {
    const {_id} = await complaintModel.findOneAndUpdate(
      { hire_id: req.body.hire_id },
      { $setOnInsert: { ...req.body } },
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );
    
    res.json({ success: true, message: "Complaint registered successfully",complaint_id:_id });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
