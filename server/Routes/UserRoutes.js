import express from 'express'
import { UserForgotPassword, getUserDatas, submitForgotPasswordOtp, userChangePassword, userGoogleLogin, userLogin, userLogout, userRegister, userSubmitOtp } from '../Controllers/UserAuthController.js'
import { getAllCategories } from '../Controllers/CategoryController.js'
import { applyJob, cancelJobRequest, createJobProfile, editJob, expireJob, getAllJobs, getEngagedJobs, getJobProfile, getLabours, getPostedJobs, getSinglejobDatas, labourProfile, postJob, rejectJobApplication, searchJobs, updateJobProfile } from '../Controllers/JobsController.js'
import { hirePayment, verifyPayment } from '../Controllers/paymentController.js'
import { createNewChatRoom, getAllMessageReceivers, getChatMessages, storeMessages } from '../Controllers/chatControllers.js'
import { getJobInfo, getProfileHistory, getSchedules, postComplaint, postReview } from '../Controllers/profileControllers.js'

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

router.post('/jobs/jobSearch',searchJobs)

router.post('/jobs/postJob',postJob)

router.get('/jobs/getAllJobs',getAllJobs)

router.post('/jobs/applyJob',applyJob)

router.get('/jobs/getPostedJobs',getPostedJobs)

router.put('/jobs/editJob',editJob)

router.patch('/jobs/expireJob',expireJob)

router.patch('/jobs/updateApplication',rejectJobApplication)

router.get('/jobs/getSinglejobDatas/:application_id',getSinglejobDatas)

router.get('/jobs/getEngagedJobs',getEngagedJobs)

router.patch('/jobs/cancelJob',cancelJobRequest)

router.get('/profile/history',getProfileHistory)

router.post('/profile/postReview',postReview)

router.post('/profile/registerComplaint',postComplaint)

router.get('/profile/getSchedules',getSchedules)

router.get('/jobs/getJobInfo/:hire_id',getJobInfo)

router.get('/logout',userLogout)


    

        



export default router