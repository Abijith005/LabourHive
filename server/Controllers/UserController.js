import userModel from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import { sentOtp } from "../Helpers/nodeMailer.js";
import bcrypt from 'bcrypt'
let otpp, eml
import { generateOtp } from '../Helpers/generateOtp.js';
import categoryModel from '../Models/categoryModel.js';



export async function userRegister(req, res) {

    try {

        const { email, password, confirmPassword } = { ...req.body }
        const user = await userModel.findOne({ email: email })

        // if user already exist in db will be rejected but google signed-in user can register

        if (user && !user.googleLogin) {
            res.json({ success: false, message: 'User Already Exists' })
        }

        else {
            if (password == confirmPassword) {
                const otp = await generateOtp(1000, 9999)
                const otpToken = await jwt.sign({ otp: otp }, process.env.JWT_SIGNATURE)
                console.log(otp);
                // sentOtp(email, otp)
                res.cookie('registerOtpToken', otpToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    withCredentials: true
                }).json({ success: true, message: 'Please enter your OTP' })
            }
            else {
                return res.json({ success: false, message: 'Password Not Matching' })
            }
        }

    } catch (error) {
        console.log('Error', error);
    }
}






export async function userSubmitOtp(req, res) {

    try {
        const otp = await jwt.verify(req.cookies.registerOtpToken, process.env.JWT_SIGNATURE)?.otp

        if (otp == parseInt(req.body.otp)) {
            const { name, email, mobileNumber } = { ...req.body }
            let { password } = req.body
            password = await bcrypt.hash(password, 10)

            //checking that the user is google signed in before if yes updating data else adding to db

            const user = await userModel.findOne({ email: email })

            if (user && user.googleLogin) {
                await userModel.updateOne({ email: email }, { $set: { password: password, mobileNumber: mobileNumber, googleLogin: false } })
            }
            else {
                await userModel.create({ name: name, email: email, mobileNumber: mobileNumber, password: password, googleLogin: false })
            }

            res.json({ success: true, message: 'Registration successful' })

        }
        else {
            res.json({ success: false, message: 'Invalid OTP' })

        }
    } catch (error) {

        console.log('Error', error);

    }
}





export async function userLogin(req, res) {

    try {
        let { email, password } = { ...req.body }
        const userData = await userModel.findOne({ email: email })
        if (!userData) {
            res.json({ success: false, message: 'Invalid User' })
        }
        else {
            const compare = await bcrypt.compare(password, userData.password)
            if (compare) {
                const userToken = await jwt.sign({ _id: userData._id }, process.env.JWT_SIGNATURE)
                const { _id, name, email, password, profilePicture, googleLogin, blockStatus, mobileNumber } = userData
                res.cookie('userAuthToken', userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    withCredentials: true
                }).json({ success: true, message: 'Explore Labour Hive', token: userToken, _id, name, password, email, blockStatus, profilePicture, googleLogin, mobileNumber })
            }

            else {
                res.json({ success: false, message: 'Inavlid Password' })
            }
        }
    } catch (error) {
        console.log('Error', error);
    }
}






export async function userGoogleLogin(req, res) {
    try {

        if (req.body.g_csrf_token) {
            const { credential } = req.body;

            //decoding the google credential to get user details

            const decodedToken = jwt.decode(credential);

            if (decodedToken.email_verified) {
                const { email, name, picture } = decodedToken;
                const userToken = jwt.sign({ _id: email }, process.env.JWT_SIGNATURE)

                //if user not added to data base then user added to db

                const user = await userModel.findOne({ email: email })
                if (!user) {
                    userModel.create({ name: name, email: email, googleLogin: true, profilePicture: picture })
                }

                res.redirect('http://localhost:4200').cookie('googleLoginToken', userToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                    withCredentials: true
                })
            }

        }
        else {
            res.redirect('http://localhost:4200/login')
        }

    } catch (error) {
        console.log('Error', error);
    }
}

export async function UserForgotPassword(req, res) {
    try {

        const { email } = req.body
        const user = await userModel.findOne({ email: email })

        if (user && !user.googleLogin) {
            eml = email
            const otp = await generateOtp(1000, 9999)
            // sentOtp(email,otp)
            console.log(otp);
            otpp = otp
            res.json({ success: true, message: 'Please enter your OTP' })

        }
        else {
            res.json({ success: false, message: 'Invalid user' })
        }

    } catch (error) {

        console.log('Err', error);
    }
}


export async function submitForgotPasswordOtp(req, res) {
    try {

        const { otp } = req.body

        if (otp == otpp) {
            res.json({ success: true })

        }
        else {
            res.json({ success: false, message: 'Invalid OTP' })
        }

    } catch (error) {

        console.log('Err', error);
    }
}


export async function userChangePassword(req, res) {

    try {

        let { password, confirmPassword } = req.body
        if (password === confirmPassword) {

            password = await bcrypt.hash(password, 10)
            await userModel.updateOne({ email: eml }, { $set: { password: password } })
            res.json({ success: true, message: 'Password changed successfully' })
        }
        else {
            res.json({ success: false, message: 'Password not matching' })
        }



    } catch (error) {

        console.log('Err', error);
    }
}


export async function getUserDatas(req, res) {

    try {

        const decode = await jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
        if (decode) {

            const user = await userModel.findOne({ _id: decode._id })

            res.json(user)

        }
        else {
            res.json({ success: false })
        }


    } catch (error) {

        console.log('Error', error);
    }

}

export async function getCategoryDetails(req,res){
    try {

        const categories=await categoryModel.find().lean()
        res.json({categories})
        
    } catch (error) {
        
        console.log('Error',error);
    }
}


export async function userLogout(req, res) {
    try {

        res.json({ success: true, message: 'User logged out' })

    } catch (error) {
        console.log('Err', error);
    }
}
