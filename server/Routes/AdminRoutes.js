import express from 'express'
import { adminLogin, blockOrUnblockUser, getAllUsers } from '../Controllers/AdminController.js'
import { addCategory, blockCategory, deleteCategory, getAllCategories, updateCategory } from '../Controllers/CategoryController.js'
const router=express.Router()


router.post('/login',adminLogin)

router.get('/getAllUsers',getAllUsers)

router.patch('/blockStatus',blockOrUnblockUser)

router.post('/addCategory',addCategory)

router.get('/getAllCategories',getAllCategories)

router.put('/updateCategory',updateCategory)

router.patch('/blockCategory',blockCategory)

router.delete('/deleteCategory/:_id',deleteCategory)




export default router                      