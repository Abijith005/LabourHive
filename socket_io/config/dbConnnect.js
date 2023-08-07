import mongoose from "mongoose";

export default function dbConnect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('db connected');
    }).catch((err=>{
        console.log('data base error\n'+err);
    }))
    
}

