import express from 'express'
import { addCategory, adminLogin, blockOrUnblockUser, getAllUsers } from '../Controllers/AdminController.js'
const router=express.Router()


router.post('/login',adminLogin)

router.get('/getAllUsers',getAllUsers)

router.patch('/blockStatus',blockOrUnblockUser)

router.post('/addCategory',addCategory)



export default router