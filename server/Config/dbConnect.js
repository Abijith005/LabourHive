import mongoose from 'mongoose'

function dbConnect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('db Connected');
    }).catch((err)=>{
        console.log('data base error\n'+err);
    })
}
 

export default dbConnect 