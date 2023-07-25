import express from 'express'
import { UserForgotPassword, getCategoryDetails, getUserDatas, submitForgotPasswordOtp, userChangePassword, userGoogleLogin, userLogin, userLogout, userRegister, userSubmitOtp } from '../Controllers/UserController.js'

const router=express.Router()  

router.post('/register',userRegister)

router.post('/submitOtp',userSubmitOtp)

router.post('/login',userLogin)

router.post('/googleLogin',userGoogleLogin) 

router.post('/forgotPassword',UserForgotPassword)

router.post('/submitForgotOtp',submitForgotPasswordOtp)

router.put('/changePassword',userChangePassword)

router.get('/getUserDatas',getUserDatas)

router.get('/getCategoryDetails',getCategoryDetails)

router.get('/logout',userLogout)

    

            





export default router