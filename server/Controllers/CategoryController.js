import { set } from "mongoose";
import cloudinary from "../Config/cloudinary.js";
import categoryModel from "../Models/categoryModel.js";

export async function addCategory(req, res) {
  try {
    const { name, basicWage } = req.body;
    async function uploadToCloudinary(image) {
      return (
        await cloudinary.uploader.upload(image, {
          folder: "LabourHive",
        })
      ).secure_url;
    }
    const image =await uploadToCloudinary(req.body.vectorImage);
    const subImage =await uploadToCloudinary(req.body.subImage);
    const category = await categoryModel.findOne({ name: name });

    if (!category) {
      await categoryModel.create({
        name: name,
        basicWage: basicWage,
        vectorImage: image,
        subImage: subImage,
      });
      const categories = await categoryModel.find().lean();

      res.json({
        success: true,
        message: "Category added successfully",
        categories,
      });
    } else {
      res.json({ success: false, message: "Category already exists" });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.find().lean();
    res.json({ categories });
  } catch (error) {
    console.log("Error", error);
  }
}

export async function updateCategory(req, res) {
  try {
    const {subImage, vectorImage, _id } = req.body;
    const category = {
      name: req.body.name,
      basicWage: req.body.basicWage,
    };

    async function uploadToCloudinary(image){
      return (await cloudinary.uploader.upload(image,{folder:'LabourHive'})).secure_url
    }

    if (vectorImage) {
      const uploadedVector = uploadToCloudinary(vectorImage)
      category.vectorImage =await uploadedVector;
    }
    if (subImage) {
      const uploadedSubImage=uploadToCloudinary(subImage)
      category.subImage =await uploadedSubImage;
    }

    const update = await categoryModel.updateOne(
      { _id: _id },
      { $set: { ...category } }
    );

    if (update) {
      const categories = await categoryModel.find().lean();
      res.json({
        success: true,
        message: "Category updated successfully",
        categories,
      });
    } else {
      res.json({ success: false, message: "Unknown error occured" });
    }
  } catch (error) {
    console.log("Error", error);
  }
}

export async function blockCategory(req, res) {
  try {
    const { _id, status } = req.body;
    const message = status
      ? "Category unblocked successfully"
      : "Category blocked successfully";
    await categoryModel.updateOne(
      { _id: _id },
      { $set: { blockStatus: !status } }
    );
    const categories = await categoryModel.find().lean();

    res.json({ success: true, message, categories });
  } catch (error) {
    console.log("Error", error);
  }
}

export async function deleteCategory(req, res) {
  try {
    const _id = req.params._id;
    await categoryModel.deleteOne({ _id: _id });
    const categories = await categoryModel.find().lean();
    res.json({
      success: true,
      message: "Category deleted successfully",
      categories,
    });
  } catch (error) {
    console.log("Error", error);
  }
}
