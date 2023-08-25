import mongoose from "mongoose";
import { verifyToken } from "../Helpers/jwtVerify.js";
import hiringModel from "../Models/hiringModel.js";
import reviewModel from "../Models/reviewModel.js";
import jobProfileModel from "../Models/jobProfileModel.js";

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
      { $unwind: "$review" },
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
      {$project:{
        '_id':1,
        'hiringDate':1,
        'category':1,
        'startDate':1,
        'totalDays':1,
        'totalAmount':1,
        'hireStatus':1,
        'review._id':1,
        'labour._id':1,
        'labour.name':1,
        'job._id':1,
        'job.currentStatus':1


      }}
    ];
    const d = await hiringModel.aggregate(pipeline);
    console.log(JSON.stringify(d, null, 3), "klklkl");

    // const data = await hiringModel
    //   .find(
    //     { client_id: user_id },
    //     {
    //       labourCount: 0,
    //       offeredWage: 0,
    //       totalAmount: 0,
    //       coordinates: 0,
    //       location: 0,
    //       endDate: 0,
    //       totalDays: 0,
    //     }
    //   )
    //   .populate([
    //     { path: "job_id", select: "_id currentStatus" },
    //     { path: "labour_id", select: "_id name" },
    //   ])
    //   .lean();
    // res.json({ success: true, data });
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
    await reviewModel.create({ client_id: user_id, ...req.body });
    const pipeline = [
      {
        $match: { labour_id: new mongoose.Types.ObjectId(req.body.labour_id) },
      },
      { $group: { _id: null, totalRating: { $avg: "$rating" } } },
    ];
    const rating = await reviewModel.aggregate(pipeline);
    console.log(rating);
    await jobProfileModel.updateOne(
      { user_id: req.body.labour_id },
      { $set: { rating: rating.totalRating } }
    );

    res.json({ success: true, message: "Successfully posted labour review" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
