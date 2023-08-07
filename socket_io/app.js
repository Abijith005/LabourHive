import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'
import http from 'http'
import db from './config/dbConnect.js'
import { Server } from 'socket.io'



const app=express()
const http_server=http.createServer(app)
const io = new Server(http_server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });
//middleware setting
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+'/public'))
app.use(cookieParser())
app.use(bodyParser.json())


const port=process.env.PORT||4000



//db connecting
db()

http_server.listen(port,()=>{
    console.log('soket_io runnig in port http://localhost:'+port);
})

io.on('connection',(socket)=>{
    console.log('new user connected ');
    socket.on('join',(data)=>{
        socket.join(data.room);console.log(data.user+'joined'+data.room);
        socket.broadcast.to(data.room).emit('user joined')
    })
    socket.on('message',(data)=>{
        io.in(data.room).emit('new message',{user:data.user,message:data.message})
    })
})


