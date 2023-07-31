import { log } from "console";
import cloudinary from "../Config/cloudinary.js";
import jobProfileModel from "../Models/jobProfileModel.js"
import jwt from 'jsonwebtoken'


export const createJobProfile = async (req, res) => {

  try {
    // getting user id from jwt token
    const user_id = await jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)?._id

    //uploading images to cloudinary
    const profilePic = (await cloudinary.uploader.upload(req.body.profilePic)).secure_url
    const workImages = await Promise.all(req.body.workImages.map(async image => {
      return await uploadImage(image)
    }
    ))

    async function uploadImage(image) {
      return (await cloudinary.uploader.upload(image, { folder: 'LabouHive' })).secure_url
    }

    delete req.body.profilePic, delete req.body.workImages

    await jobProfileModel.create({ user_id: user_id, ...req.body, profilePic: profilePic, workImages: workImages })

    res.json({ success: true, message: 'Job profile created successfully' })


  } catch (error) {
    console.log('Error', error);
  }

}


export const getJobProfile = async (req, res) => {

  try {

    //getting user_id
    const user_id = await jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)?._id

    let data = await jobProfileModel.findOne({ user_id: user_id })

    //converting mongoose obj to plain js obj
    data = data.toObject()

    if (data) {
      res.json({ success: true, ...data })
    }
    else {
      res.json({ success: false })
    }


  } catch (error) {

    console.log('Error', error);
  }
}

export const updateJobProfile = async (req, res) => {
  try {

    const user_id = jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)


    const profilePic = req.body.profilePic.startsWith('http://') ||
      req.body.profilePic.startsWith('https://') ||
      req.body.profilePic.startsWith('https://res.cloudinary.com') ? req.body.profilePic : await uploadImage(req.body.profilePic)

    //excluding images that already uploaded
    let workImages = req.body.workImages.filter((data) => {
      return !(data.startsWith('http://') || data.startsWith('https://') || data.startsWith('https://res.cloudinary.com'))
    })

    //getting urls of uploaded images
    workImages = await Promise.all(workImages.map(async (image) => {
      return await uploadImage(image)
    }))

    workImages = workImages.concat(req.body.workImages.filter((image => {
      return (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('https://res.cloudinary.com'))
    })))

    //uploading to cloudinary
    async function uploadImage(image) {
      console.log('uploading');
      return (await cloudinary.uploader.upload(image, { folder: 'LabouHive' })).secure_url
    }

    delete req.body.workImages, delete req.body.profilePic

    await jobProfileModel.updateOne({ user_id: user_id }, { $set: { ...req.body, workImages: workImages, profilePic: profilePic } })
    res.json({ success: true, message: 'Job profile updated successfully' })

  } catch (error) {
    console.log('Error', error);
  }

}

export const getLabours = async (req, res) => {

  try {

    console.log(req.params.category, 'hjkhkhkjhk');
    const labours = await jobProfileModel.find({ category: req.params.category }).lean()
    res.json(  labours )

  } catch (error) {

    console.log('Error', error);
  }
}