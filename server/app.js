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
import http from 'http'
import { Server } from 'socket.io';
import socketConnect from './Config/socketConnect.js';


const app = express()
const port = process.env.PORT || 5000

//socket.io
const http_server=http.createServer(app)
const io = new Server(http_server, {
    cors: {
      origin:process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });


//db connecting
db()

http_server.listen(port,()=>{
    console.log('App runnig in port http://localhost:'+port);
})


let activeUsers={}
socketConnect(io,activeUsers)



app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH',],
        credentials: true

    })
)

//middleware setting
app.use(morgan('dev'))
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.static(path.resolve() + '/public'))
app.use(cookieParser())
 

    
// database connecting  
db()


// mongoose sanitizing
app.use(mogoSanitize())


// setting router
app.use('/admin', adminRouter)
app.use('/', userRouter)    
















