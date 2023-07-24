import { set } from "mongoose";
import cloudinary from "../Config/cloudinary.js";
import categoryModel from "../Models/categoryModel.js";




export async function addCategory(req, res) {

  try {

    const { name, basicWage } = req.body
    const image = await cloudinary.uploader.upload(req.body.vectorImage, {
      folder: 'LabourHive'
    })
    const update = await categoryModel.create({ name: name, basicWage: basicWage, vectorImage: image })

    if (update) {
      const categories=await categoryModel.find().lean()

      res.json({ success: true, message: 'Category added successfully',categories })
    }
    else {

      res.json({ success: false, message: 'Unknown error occured' })
    }


  } catch (error) {
    console.log("Error", error);
  }

}



export async function getAllCategories(req, res) {

  try {

    const categories = await categoryModel.find().lean()
    res.json({categories})

  } catch (error) {
    console.log('Error', error);
  }
}

export async function updateCategory(req, res) {
  try {

    console.log('iam here');

    const { vectorImage, _id } = req.body
    const category = {
      name: req.body.name,
      basicWage: req.body.basicWage
    }

    if (vectorImage) {
      const uploadImage = await cloudinary.uploader.upload(vectorImage, { folder: 'LabouHive' })
      category.vectorImage = uploadImage

    }

    const update = await categoryModel.updateOne({ _id: _id }, { $set: { ...category } })

    if (update) {
      const categories = await categoryModel.find().lean()
      res.json({ success: true, message: 'Category updated successfully', categories })
    } else {
      res.json({ success: false, message: 'Unknown error occured' })
    }

  } catch (error) {

    console.log('Error', error);
  }
}   