import express from 'express'
import { UserForgotPassword, getUserDatas, submitForgotPasswordOtp, userChangePassword, userGoogleLogin, userLogin, userLogout, userRegister, userSubmitOtp } from '../Controllers/UserAuthController.js'
import { getAllCategories, getCategories } from '../Controllers/CategoryController.js'
import { applyJob, cancelJobRequest, changeJobStatus, createJobProfile, editJob, getAllJobs, getEngagedJobs, getJobProfile, getLabours, getPostedJobs, getSinglejobDatas, labourProfile, postJob, rejectJobApplication, searchJobs, updateJobProfile } from '../Controllers/JobsController.js'
import { Payment, verifyPayment } from '../Controllers/paymentController.js'
import { createNewChatRoom, getAllMessageReceivers, getChatMessages, storeMessages } from '../Controllers/chatControllers.js'
import { changeEmail, changePassword, editBasicInfo, getJobInfo, getProfileHistory, getReviews, getSchedules, postComplaint, postReview, requestWithdrawal } from '../Controllers/profileControllers.js'
import { getWalletDetails } from '../Controllers/walletController.js'

const router=express.Router()  

router.post('/register',userRegister)

router.post('/submitOtp',userSubmitOtp)

router.post('/login',userLogin)

router.post('/googleLogin',userGoogleLogin) 

router.post('/forgotPassword',UserForgotPassword)

router.post('/submitForgotOtp',submitForgotPasswordOtp)

router.put('/changePassword',userChangePassword)

router.get('/getUserDatas',getUserDatas)

router.get('/getCategoryDetails/:page',getCategories)

router.get('/getAllCategoryDetails',getAllCategories)

router.post('/uploadJobProfile',createJobProfile)

router.get('/getJobProfileDetails',getJobProfile)

router.put('/updateJobProfile',updateJobProfile)

router.post('/getLabours',getLabours)

router.get('/getLabourProfile/:user_id',labourProfile)

router.post('/hirePayment',Payment)

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

router.patch('/jobs/expireJob',changeJobStatus)

router.patch('/jobs/updateApplication',rejectJobApplication)

router.get('/jobs/getSinglejobDatas/:application_id',getSinglejobDatas)

router.get('/jobs/getEngagedJobs',getEngagedJobs)

router.patch('/jobs/cancelJob',cancelJobRequest)

router.get('/profile/history',getProfileHistory)

router.post('/profile/postReview',postReview)

router.post('/profile/registerComplaint',postComplaint)

router.get('/profile/getSchedules',getSchedules)

router.get('/jobs/getJobInfo/:hire_id',getJobInfo)

router.get('/profile/getReviews',getReviews)

router.get('/profile/getWallet',getWalletDetails)

router.post('/profile/withdrawalRequest',requestWithdrawal)

router.patch('/profile/editBasciInfo',editBasicInfo)

router.patch('/profile/changeEmail',changeEmail)

router.patch('/profile/changePassword',changePassword)

router.get('/logout',userLogout)

        

export default router