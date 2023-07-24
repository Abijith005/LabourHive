import express from 'express'
import { adminLogin, blockOrUnblockUser, getAllUsers } from '../Controllers/AdminController.js'
import { addCategory, getAllCategories, updateCategory } from '../Controllers/CategoryController.js'
const router=express.Router()


router.post('/login',adminLogin)

router.get('/getAllUsers',getAllUsers)

router.patch('/blockStatus',blockOrUnblockUser)

router.post('/addCategory',addCategory)

router.get('/getAllCategories',getAllCategories)

router.put('/updateCategory',updateCategory)




export default router             