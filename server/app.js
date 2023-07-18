import 'dotenv/config.js'
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';
import db from './Config/dbConnect.js'
import mogoSanitize from 'express-mongo-sanitize'
import adminRouter from './Routes/AdminRoutes.js'
import userRouter from './Routes/UserRoutes.js'



const app = express()
const port = process.env.PORT || 5000
app.use(
    cors({
        origin: ['http://localhost:4200'],
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH',],
        credentials: true

    })
)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + '/public'))
app.use(cookieParser())



    
// database connecting  
db()


// ffffff

// mongoose sanitizing
app.use(mogoSanitize())

app.get('/test', (req, res) => {
    res.json("sdfsdf")
})

// setting router
app.use('/admin', adminRouter)
app.use('/', userRouter)

app.listen(port, () => {
    console.log('app running in port http://localhost:' + port);
})














