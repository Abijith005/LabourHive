import mongoose from "mongoose";
import { verifyToken } from "../Helpers/jwtVerify.js";
import hiringModel from "../Models/hiringModel.js";
import reviewModel from "../Models/reviewModel.js";
import jobProfileModel from "../Models/jobProfileModel.js";
import complaintModel from "../Models/complaintModel.js";
import scheduleModel from "../Models/scheduleModel.js";
import { populate } from "dotenv";

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
      { $unwind: { path: "$review", preserveNullAndEmptyArrays: true } },
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
      { $unwind: { path: "$job", preserveNullAndEmptyArrays: true } },
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
    console.log(data);
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
    const { _id } = await reviewModel.create({
      client_id: user_id,
      ...req.body,
    });
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

    res.json({
      success: true,
      message: "Successfully posted labour review",
      review_id: _id,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const postComplaint = async (req, res) => {
  try {
    const { _id } = await complaintModel.findOneAndUpdate(
      { hire_id: req.body.hire_id },
      { $setOnInsert: { ...req.body } },
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Complaint registered successfully",
      complaint_id: _id,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getSchedules = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const currentDate = new Date();
    const sevenDaysFromNow = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    let weekSchedules = await scheduleModel.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(user_id),
        },
      },
      { $unwind: { path: "$weekSchedule", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          "weekSchedule.date": { $gte: currentDate, $lte: sevenDaysFromNow },
        },
      },
      { $sort: { "weekSchedule.date": 1 } },
      {
        $group: {
          _id: user_id,
          weekSchedules: { $push: "$weekSchedule" },
        },
      },
    ]);

    weekSchedules = weekSchedules[0].weekSchedules;
    for (let i = 0; i < 7; i++) {
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(currentDate.getDate() + i);
      if (
        !weekSchedules[i] ||
        weekSchedules[i]?.date?.getDate() !== expectedDate.getDate()
      ) {
        weekSchedules.splice(i, 0, { date: expectedDate, hire_id: "" });
      }
    }
    res.json(weekSchedules);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getJobInfo = async (req, res) => {
  try {
    const { hire_id } = req.params;
    const {job_id} = await hiringModel
      .findOne({ _id: hire_id },{job_id:1})
      .populate({
        path: 'job_id',
        populate: {
          path: 'category',select:'name'
        },
      });
    console.log(job_id, "dhfjhdsjhf");
    res.json(job_id);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
