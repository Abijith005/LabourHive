import express from 'express'
import { adminLogin, blockOrUnblockUser, getAllUsers } from '../Controllers/AdminController.js'
import { addCategory, blockCategory, deleteCategory, getAllCategories, updateCategory } from '../Controllers/CategoryController.js'
import { changeJobStatus, getAllJobDetails } from '../Controllers/JobsController.js'
import { getWalletDetails } from '../Controllers/walletController.js'
import { getHirings } from '../Controllers/hireController.js'
import { updatePayment } from '../Controllers/paymentController.js'
const router=express.Router()


router.post('/login',adminLogin)

router.get('/getAllUsers',getAllUsers)

router.patch('/blockStatus',blockOrUnblockUser)

router.post('/addCategory',addCategory)

router.get('/getAllCategories',getAllCategories)

router.put('/updateCategory',updateCategory)

router.patch('/blockCategory',blockCategory)

router.delete('/deleteCategory/:_id',deleteCategory)

router.get('/getAllJobDetails',getAllJobDetails)

router.get('/getWalletDetails',getWalletDetails)

router.get('/getHirings',getHirings)

router.patch('/changeJobStatus',changeJobStatus)

router.patch('/updatePayment',updatePayment)



    
export default router                      