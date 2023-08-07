 import mongoose from "mongoose";

const  dbConnect=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('db connected');
    }).catch((err)=>{
        console.log('db error',err);
    })
}

export default dbConnect