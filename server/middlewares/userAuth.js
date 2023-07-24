import  Jwt from "jsonwebtoken"

export async function userAuthCheck(req,res,next){
    const token=req.cookies('userAuthToken')
    const verify=await Jwt.verify(token,process.env.JWT_SIGNATURE)
    console.log(verify);
    if (verify) {
        res.next()
    }
    else{
        console.log('error');
    }


}