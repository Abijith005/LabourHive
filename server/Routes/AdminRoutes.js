import express from 'express'
import { adminLogin, blockOrUnblockUser, getAllUsers } from '../Controllers/AdminController.js'
import { addCategory, blockCategory, deleteCategory, getAllCategories, updateCategory } from '../Controllers/CategoryController.js'
import { changeJobStatus, getAllJobDetails, getHederDatas } from '../Controllers/JobsController.js'
import { getWithdrawDatas } from '../Controllers/walletController.js'
import { approveHireCancel, getAllComplaints, getAllHireDetails, getHirings } from '../Controllers/hireController.js'
import { adminPayment, adminPaymentVerifying, adminRefund, getRevenueDatas, rejectWithdrawRequest, updatePayment } from '../Controllers/paymentController.js'
const router=express.Router()


router.post('/login',adminLogin)

router.get('/getAllUsers',getAllUsers)

router.patch('/blockStatus',blockOrUnblockUser)

router.post('/addCategory',addCategory)

router.get('/getAllCategories',getAllCategories)

router.put('/updateCategory',updateCategory)

router.patch('/blockCategory',blockCategory)

router.delete('/deleteCategory/:_id',deleteCategory)

router.post('/getAllJobDetails',getAllJobDetails)

router.get('/getWalletDatas',getWithdrawDatas)

router.get('/getHirings',getHirings)

router.patch('/changeJobStatus',changeJobStatus)

router.patch('/rejectWithdrawRequest',rejectWithdrawRequest)

router.post('/adminPayment',adminPayment)

router.post('/adminRefund',adminRefund)

router.patch('/updatePayment',updatePayment)

router.post('/verifyPayment', adminPaymentVerifying)

router.get('/getAllHireDetails',getAllHireDetails)

router.patch('/approveHireCancel',approveHireCancel)

router.get('/getComplaints',getAllComplaints)

router.get('/getRevenueData',getRevenueDatas)

router.get('/getHeaderDatas',getHederDatas)



    
export default router                      