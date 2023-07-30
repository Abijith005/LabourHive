import cloudinary from "../Config/cloudinary.js";
import jobProfileModel from "../Models/jobProfileModel.js"
import jwt from 'jsonwebtoken'


export const createJobProfile=async(req, res)=>{

  try {
    // getting user id from jwt token
    const user_id = await jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)?._id

    //uploading images to cloudinary
    const profilePic = (await cloudinary.uploader.upload(req.body.profilePic)).secure_url
    const workImages = await Promise.all(req.body.workImages.map(async image => await uploadImage(image)))
    
    async function uploadImage(image) {
      return (await cloudinary.uploader.upload(image)).secure_url
    }

    delete req.body.profilePic, delete req.body.workImages

    await jobProfileModel.create({ user_id: user_id, ...req.body, profilePic: profilePic, workImages: workImages })

    res.json({ success: true, message: 'Job profile created successfully' })


  } catch (error) {
    console.log('Error', error);
  }

}


export const getJobProfile=async (req,res)=>{

  try {

    //getting user_id
    const user_id=await jwt.verify(req.cookies.userAuthToken,process.env.JWT_SIGNATURE)?._id
    
    let data=await jobProfileModel.findOne({user_id:user_id})

    //converting mongoose obj to plain js obj
    data=data.toObject()  
    
    if (data) {
      res.json({success:true,...data})
    }
    else{
      res.json({success:false})
    }

    
  } catch (error) {
    
    console.log('Error',error);
  }
} 