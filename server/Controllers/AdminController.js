import adminModel from "../Models/adminModel.js";
import jwt from 'jsonwebtoken'

export async function adminLogin(req, res) {

    try {

        const { email, password } = req.body

        const admin = await adminModel.findOne({ email: email })

        if (admin && password == admin.password) {

            const token= jwt.sign({ _id: admin._id }, process.env.JWT_SIGNATURE)

             res.cookie('adminToken',token,{
                httpOnly:true,
                secure:true,
                maxAge:7*24*60*1000,
                sameSite:'none',
                withCredential:true
             }).json({success:true,message:'Login successful!!'})

        }
        else{
            res.json({success:false,message:'Invalid email or password'})
        }



    } catch (error) {
        console.log('Error', error);
    }
}