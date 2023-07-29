import express from 'express'
import { UserForgotPassword, getUserDatas, submitForgotPasswordOtp, userChangePassword, userGoogleLogin, userLogin, userLogout, userRegister, userSubmitOtp } from '../Controllers/UserAuthController.js'
import { getAllCategories } from '../Controllers/CategoryController.js'
import { createJobProfile } from '../Controllers/JobsController.js'

const router=express.Router()  

router.post('/register',userRegister)

router.post('/submitOtp',userSubmitOtp)

router.post('/login',userLogin)

router.post('/googleLogin',userGoogleLogin) 

router.post('/forgotPassword',UserForgotPassword)

router.post('/submitForgotOtp',submitForgotPasswordOtp)

router.put('/changePassword',userChangePassword)

router.get('/getUserDatas',getUserDatas)

router.get('/getCategoryDetails',getAllCategories)

router.post('/uploadJobProfile',createJobProfile)

router.get('/logout',userLogout)

    

            





export default router