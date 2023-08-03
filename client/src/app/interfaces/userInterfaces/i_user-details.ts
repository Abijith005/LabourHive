import { i_jobProfile } from "./i_jobProfile";

export interface i_UserDetails {
    
        _id:string,
        name: string,
        email:string,
        mobileNumber?:string,
        password?:string,
        profilePicture?:string,
        blockStatus:boolean,
        googleLogin:boolean,
        jobProfileDatas?:i_jobProfile
    
    }

