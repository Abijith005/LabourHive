import express from 'express'
import { UserForgotPassword, getUserDatas, submitForgotPasswordOtp, userChangePassword, userGoogleLogin, userLogin, userLogout, userRegister, userSubmitOtp } from '../Controllers/UserAuthController.js'
import { getAllCategories } from '../Controllers/CategoryController.js'
import { createJobProfile, getJobProfile, getLabours, labourProfile, updateJobProfile } from '../Controllers/JobsController.js'
import { hirePayment, verifyPayment } from '../Controllers/paymentController.js'
import { createNewChatRoom, getAllMessageReceivers, getChatMessages, storeMessages } from '../Controllers/chatControllers.js'

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

router.get('/getJobProfileDetails',getJobProfile)

router.put('/updateJobProfile',updateJobProfile)

router.get('/getLabours/:category',getLabours)

router.get('/getLabourProfile/:user_id',labourProfile)

router.post('/hirePayment',hirePayment)

router.post('/hirePayment/verifyPayment',verifyPayment)

router.post('/chat/createNewChatRoom',createNewChatRoom)

router.post('/chat/storeMessages',storeMessages)

router.get('/chat/getAllReceivers/:user_id',getAllMessageReceivers)

router.get('/chat/getAllMessages/:room_id',getChatMessages)

router.get('/logout',userLogout)

    

        



export default router