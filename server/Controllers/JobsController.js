import cloudinary from "../Config/cloudinary.js";
import jobProfileModel from "../Models/jobProfileModel.js"


export const createJobProfile = async (req, res) => {

    try {
console.log('dfjafnknfka');
        const profilePic=(await cloudinary.uploader.upload(req.body.profilePic)).secure_url
        const workImages=await Promise.all( req.body.workImages.map(image=>uploadImage(image)))

       async function uploadImage(image){
          return (await cloudinary.uploader.upload(image)).secure_url
        }
        
        delete req.body.workImages,delete req.body.profilePic

        console.log(req.body);

      const model= await jobProfileModel.create({...req.body,profilePic:profilePic,workImages:workImages})
      console.log(model);
       res.json({success:true,message:'Job profile created successfully'})
    } catch (error) {

    }

}