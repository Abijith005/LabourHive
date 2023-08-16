import cloudinary from "../Config/cloudinary.js";
import jobProfileModel from "../Models/jobProfileModel.js";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import jobsModel from "../Models/jobsModel.js";

export const createJobProfile = async (req, res) => {
  try {
    // getting user id from jwt token
    const user_id = await jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;

    //uploading images to cloudinary
    const profilePic = (await cloudinary.uploader.upload(req.body.profilePic))
      .secure_url;
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
  }
};

export const getJobProfile = async (req, res) => {
  try {
    //getting user_id
    const user_id = await jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;

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
  }
};

export const getLabours = async (req, res) => {
  try {
    const user_id = await jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;
    const labours = await jobProfileModel
      .find({ category: req.params.category })
      .find({
        $and: [
          { category: req.params.category },
          { user_id: { $ne: user_id } },
        ],
      })
      .lean();
    res.json(labours);
  } catch (error) {
    console.log("Error", error);
  }
};

export const labourProfile = async (req, res) => {
  try {
    let labourProfile = await jobProfileModel.findOne({
      user_id: req.params.user_id,
    });

    // converting mongoose object to normal object
    labourProfile = labourProfile.toObject();

    res.json({ success: true, ...labourProfile });
  } catch (error) {
    console.log("Error", error);
  }
};

export const searchJobs = async (req, res) => {
  try {
    const { coordinates, searchKey } = req.body;
    const date = new Date();
    let jobs = await jobsModel
      .find({
        $and: [
          { category: RegExp(searchKey, "i") },
          { startDate: { $gt: date } },
          { currentStatus: "active" },
        ],
      })
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

    res.json(jobs);
  } catch (error) {
    console.log("Error", error);
  }
};

export const postJob = async (req, res) => {
  try {
    const user_id = jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;
    await jobsModel.create({ client_id: user_id, ...req.body });
    res.json({ success: true, message: "Job posted successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const currentDate = new Date();
    const jobs = await jobsModel
      .find({
        $and: [
          { startDate: { $gt: currentDate } },
          { currentStatus: "active" },
        ],
      })
      .lean();
    res.json(jobs);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false });
  }
};
