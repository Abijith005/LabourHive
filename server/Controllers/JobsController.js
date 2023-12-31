import cloudinary from "../Config/cloudinary.js";
import jobProfileModel from "../Models/jobProfileModel.js";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import jobsModel from "../Models/jobsModel.js";
import categoryModel from "../Models/categoryModel.js";
import applicantModel from "../Models/applicantModel.js";
import { verifyToken } from "../Helpers/jwtVerify.js";
import mongoose from "mongoose";
import { json } from "stream/consumers";
import hiringModel from "../Models/hiringModel.js";
import scheduleModel from "../Models/scheduleModel.js";
import { count } from "console";

export const createJobProfile = async (req, res) => {
  try {
    // getting user id from jwt token
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;

    //uploading images to cloudinary
    const profilePic = (
      await cloudinary.uploader.upload(req.body.profilePic, {
        folder: "LabourHive",
      })
    ).secure_url;
    const workImages = await Promise.all(
      req.body.workImages.map(async (image) => {
        return await uploadImage(image);
      })
    );

    async function uploadImage(image) {
      return (await cloudinary.uploader.upload(image, { folder: "LabouHive" }))
        .secure_url;
    }

    delete req.body.profilePic, delete req.body.workImages;

    const jobProfile = await jobProfileModel.create({
      user_id: user_id,
      ...req.body,
      profilePic: profilePic,
      workImages: workImages,
    });
    await userModel.updateOne(
      { _id: user_id },
      { $set: { jobProfileDatas: jobProfile._id } }
    );

    res.json({ success: true, message: "Job profile created successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getJobProfile = async (req, res) => {
  try {
    //getting user_id
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;

    let data = await jobProfileModel.findOne({ user_id: user_id });

    if (data) {
      //converting mongoose obj to plain js obj
      data = data.toObject();
      res.json({ success: true, ...data });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const updateJobProfile = async (req, res) => {
  try {
    const user_id = jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    );

    const profilePic =
      req.body.profilePic.startsWith("http://") ||
      req.body.profilePic.startsWith("https://") ||
      req.body.profilePic.startsWith("https://res.cloudinary.com")
        ? req.body.profilePic
        : await uploadImage(req.body.profilePic);

    //excluding images that already uploaded
    let workImages = req.body.workImages.filter((data) => {
      return !(
        data.startsWith("http://") ||
        data.startsWith("https://") ||
        data.startsWith("https://res.cloudinary.com")
      );
    });

    //getting urls of uploaded images
    workImages = await Promise.all(
      workImages.map(async (image) => {
        return await uploadImage(image);
      })
    );

    workImages = workImages.concat(
      req.body.workImages.filter((image) => {
        return (
          image.startsWith("http://") ||
          image.startsWith("https://") ||
          image.startsWith("https://res.cloudinary.com")
        );
      })
    );

    //uploading to cloudinary
    async function uploadImage(image) {
      return (await cloudinary.uploader.upload(image, { folder: "LabouHive" }))
        .secure_url;
    }

    delete req.body.workImages, delete req.body.profilePic;

    await jobProfileModel.updateOne(
      { user_id: user_id },
      { $set: { ...req.body, workImages: workImages, profilePic: profilePic } }
    );
    res.json({ success: true, message: "Job profile updated successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getLabours = async (req, res) => {
  try {
    console.log(req.body);
    const { name, coordinates, category, page } = req.body;
    console.log(name, coordinates, category, "123456789", !name, !coordinates);

    const user_id = (await verifyToken(req.cookies?.userAuthToken))
      ? (await verifyToken(req.cookies?.userAuthToken))._id
      : "";
    let labours = await jobProfileModel
      .find({
        $and: [
          { category: category },
          { user_id: { $ne: user_id } },
          { name: RegExp(name, "i") },
        ],
      })
      .lean();

    if (coordinates) {
      console.log("dfsfscoordinates");
      const searchLon = coordinates[0];
      const searchLat = coordinates[1];
      //limit is set to 10 km
      const limitDistance = 5;
      // haversine formula to get distance from geocodes
      function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
      }
      // function for converting degree to radian
      function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

      labours = labours.filter((job) => {
        return (
          haversineDistance(
            searchLat,
            searchLon,
            job.coordinates[1],
            job.coordinates[0]
          ) <= limitDistance
        );
      });
    }
    const count = Math.ceil(labours.length) / 8;
    labours = labours.slice((page - 1) * 8, page * 8);
    res.json({ labours, totalPages: count });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const labourProfile = async (req, res) => {
  try {
    let labourProfile = await jobProfileModel.findOne({
      user_id: req.params.user_id,
    });

    const today = new Date().getDate();
    const weekSchedule = await scheduleModel.findOne({
      user_id: req.params.user_id,
    });
    const schedule = weekSchedule?.weekSchedule
      ? Array.from(weekSchedule.weekSchedule, (item) =>
          item.date.getDate()
        ).filter((date) => date > today)
      : [];
    // converting mongoose object to normal object
    labourProfile = labourProfile.toObject();
    res.json({ success: true, ...labourProfile, schedule });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const searchJobs = async (req, res) => {
  try {
    console.log(req.body);
    const { coordinates, searchKey, page } = req.body;
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;
    //getting category ids maching search query

    const categories = await categoryModel
      .find({ name: RegExp(searchKey, "i") }, { _id: 1 })
      .lean();

    const category_ids = categories.map((item) => {
      return item._id;
    });

    // getting todays date
    const date = new Date();
    let jobs = await jobsModel
      .find({
        $and: [
          { category: { $in: category_ids } },
          { startDate: { $gt: date } },
          { currentStatus: "active" },
          { postedJob: true },
          { client_id: { $ne: user_id } },
        ],
      })
      .populate("category")
      .lean();
    //if location is given then we need to filter jobs around 10 km radius of the given location

    if (coordinates) {
      const searchLon = coordinates[0];
      const searchLat = coordinates[1];
      //limit is set to 10 km
      const limitDistance = 10;
      // haversine formula to get distance from geocodes
      function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
      }
      // function for converting degree to radian
      function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

      jobs = jobs.filter((job) => {
        return (
          haversineDistance(
            searchLat,
            searchLon,
            job.coordinates[1],
            job.coordinates[0]
          ) <= limitDistance
        );
      });
    }

    const totalPages = Math.ceil(jobs.length / 8);

    jobs = jobs.slice((page - 1) * 8, page * 8);
    res.json({jobs,totalPages:totalPages});
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
}; 

export const postJob = async (req, res) => {
  try {
    // avoiding error of time zone converstion by adding one day
console.log(req.body);
    const startDate = new Date(req.body.startDate);
    startDate.setHours(startDate.getHours() + 5, startDate.getMinutes() + 30);

    const endDate = new Date(req.body.endDate);
    endDate.setHours(endDate.getHours() + 5, endDate.getMinutes() + 30);

    (req.body.startDate = startDate.toISOString()),
      (req.body.endDate = endDate.toISOString());

    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;
    const { _id } = await categoryModel.findOne({
      name: req.body.categoryName,
    });
    req.body.category = _id;
    await jobsModel.create({ client_id: user_id, ...req.body });
    res.json({ success: true, message: "Job posted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const currentDate = new Date();
    const jobs = await jobsModel
      .find({
        $and: [
          { startDate: { $gt: currentDate } },
          { currentStatus: "active" },
          { client_id: { $ne: user_id } },
          { postedJob: true },
        ],
      })
      .populate("category")
      .lean();
    res.json(jobs);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;
    const jobProfile = await jobProfileModel.find({ user_id: user_id });
    if (jobProfile) {
      const applicant = await applicantModel.findOne({
        job_id: job_id,
        applicant_id: user_id,
      });
      if (!applicant) {
        await applicantModel.create({ applicant_id: user_id, job_id: job_id });
        res.json({ success: true, message: "Job applied successfully" });
      } else {
        res.json({ success: false, message: "Already applied for this job" });
      }
    } else {
      res.json({ success: false, message: "please create job profile" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error ocuured" });
  }
};

export const getPostedJobs = async (req, res) => {
  try {
    // getting user_id
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;

    // pipeline to get job data and applicant data
    const pipeline = [
      { $match: { client_id: new mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "applicants",
          let: { jobId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$job_id", "$$jobId"] } },
            },
            {
              $lookup: {
                from: "jobprofiles",
                localField: "applicant_id",
                foreignField: "user_id",
                as: "profileData",
              },
            },
            {
              $unwind: {
                path: "$profileData",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "applicants",
        },
      },
      { $unwind: { path: "$applicants", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$_id",
          client_id: { $first: "$client_id" },
          categoryName: { $first: "$category.name" },
          experience: { $first: "$experience" },
          wage: { $first: "$wage" },
          requiredCount: { $first: "$requiredCount" },
          postDate: { $first: "$createdAt" },
          updatedDate: { $first: "$updatedAt" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          location: { $first: "$location" },
          jobDescription: { $first: "$jobDescription" },
          currentStatus: { $first: "$currentStatus" },
          applicants: { $push: "$applicants" },
        },
      },
      {
        $addFields: {
          applicantCount: { $size: "$applicants" },
        },
      },
      { $sort: { postDate: -1 } },
    ];

    const jobs = await jobsModel.aggregate(pipeline);
    res.json({ jobs, success: true });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const editJob = async (req, res) => {
  try {
    const { job_id } = req.body;
    delete req.body.job_id;
    if (!req.body.location) {
      delete req.body.location;
    }
    await jobsModel.updateOne({ _id: job_id }, { $set: { ...req.body } });
    res.json({ success: true, message: "Job edited successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const changeJobStatus = async (req, res) => {
  try {
    const currentDate = new Date();
    const { job_id, status } = req.body;
    const update = await jobsModel.updateOne(
      { $and: [{ _id: job_id }, { endDate: { $lt: currentDate } }] },
      { $set: { currentStatus: status } }
    );
    if (update.modifiedCount) {
      res.json({ success: true, message: "Job status updated successfully" });
    } else {
      res.json({
        success: false,
        message: "Cant Update! Job end date mismatched",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const rejectJobApplication = async (req, res) => {
  try {
    const { application_id, value } = req.body;
    await applicantModel.updateOne(
      { _id: application_id },
      { $set: { applicationStatus: value } }
    );
    res.json({ success: true, message: "Rejected application successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getSinglejobDatas = async (req, res) => {
  try {
    const application_id = req.params.application_id;
    const data = await applicantModel
      .findOne({ _id: application_id })
      .populate("job_id")
      .lean();
    res.json({ success: true, data: data.job_id });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getEngagedJobs = async (req, res) => {
  try {
    const user_id = (await verifyToken(req.cookies.userAuthToken))._id;
    const engagedJobs = await hiringModel
      .find({ labour_id: user_id })
      .populate([
        { path: "job_id", select: "_id  experience jobDescription createdAt" },
        { path: "client_id", select: "_id name " },
      ])
      .lean();
    res.json({ success: true, engagedJobs: engagedJobs });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const cancelJobRequest = async (req, res) => {
  try {
    const hireStatus =
      req.body?.party === "client"
        ? "cancelRequested_client"
        : "cancelRequested_labour";

    const { hire_id } = req.body;
    await hiringModel.updateOne({ _id: hire_id }, { $set: { hireStatus } });
    res.json({
      success: true,
      message: "Successfully requested for cancel Hiring",
      currentStatus: "cancelRequested_client",
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllJobDetails = async (req, res) => {
  try {
    const { filter, search, page, startDate, endDate } = req.body;
    const sDate = startDate
      ? new Date(
          new Date(startDate).setHours(
            new Date(startDate).getHours() + 5,
            new Date(startDate).getMinutes() + 30
          )
        )
      : null;
    const eDate = endDate
      ? new Date(
          new Date(endDate).setHours(
            new Date(endDate).getHours() + 5,
            new Date(endDate).getMinutes() + 30
          )
        )
      : null;

    const client_id = await userModel
      .find({ name: RegExp(search, "i") }, { _id: 1 })
      .lean();
    let query = {
      currentStatus: RegExp(filter, "i"),
      client_id: { $in: client_id },
    };
    if (sDate) {
      query.endDate = { $gte: sDate };
    }
    if (eDate) {
      query.endDate = { $lte: eDate };
    }

    const jobs = await jobsModel
      .find(query)
      .populate([
        { path: "client_id", select: "name" },
        { path: "category", select: "name" },
      ])
      .lean();
    res.json(jobs);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getHederDatas = async (req, res) => {
  try {
    const hirePipeLine = [
      {
        $facet: {
          totalHirings: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          totalRevenue: [
            {
              $match: {
                payment: "approved",
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: {
                  $sum: {
                    $subtract: [
                      "$totalAmount",
                      { $divide: ["$totalAmount", 1.01] },
                    ],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                revenue: { $divide: ["$totalRevenue", 1000] },
              },
            },
          ],
        },
      },
      { $unwind: { path: "$totalHirings", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$totalRevenue", preserveNullAndEmptyArrays: true } },
    ];

    const currentDate = new Date();

    const users = await userModel.find().countDocuments();

    const datas = await hiringModel.aggregate(hirePipeLine);

    const jobs = await jobsModel
      .find({
        $and: [
          { currentStatus: "active" },
          { startDate: { $gt: currentDate } },
        ],
      })
      .countDocuments();

    const headerDatas = {
      totalRevenue: datas[0]?.totalRevenue.revenue,
      totalHire: datas[0]?.totalHirings.count,
      totalUsers: users,
      totalJobs: jobs,
    };

    res.json(headerDatas);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
