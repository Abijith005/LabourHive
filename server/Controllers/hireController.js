import mongoose from "mongoose";
import hiringModel from "../Models/hiringModel.js";
import complaintModel from "../Models/complaintModel.js";

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
          payment: 1,
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
    res.json(hireDatas);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllHireDetails = async (req, res) => {
  try {
    const hireDatas = await hiringModel
      .find()
      .populate({ path: "client_id", select: "name" })
      .populate({ path: "labour_id", select: "name" })
      .lean();
    res.json(hireDatas);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const approveHireCancel = async (req, res) => {
  try {
    const { hire_id } = req.body;
    const hireStatus =
      req.body?.hireStatus === "cancelRequested_labour"
        ? "cancelled_labour"
        : "cancelled_client";

    await hiringModel.updateOne(
      { _id: hire_id },
      { $set: { hireStatus: hireStatus } }
    );
    res.json({ success: true, message: "Hiring cancelled successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const query=[
      {
        $lookup: {
          from: "hirings",
          localField: "hire_id",
          foreignField: "_id",
          as: "hireData",
        },
      },
      { $unwind: { path: "$hireData", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "hireData.client_id",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "hireData.labour_id",
          foreignField: "_id",
          as: "labour",
        },
      },
      { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },
      {$project:{
        hire_id:1,
        complaintText:1,
        hireStatus:1,
        'hireData._id':1,
        'hireData.startDate':1,
        'hireData.endDate':1,
        'hireData.hiringDate':1,
        'hireData.payment':1,
        'hireData.category':1,
        'client._id':1,
        'client.name':1,
        'labour._id':1,
        'labour.name':1,
      }}
    ]
    const complaints = await complaintModel.aggregate(query);
    res.json(complaints);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
