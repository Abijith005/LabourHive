import { i_category } from "../adminInterfaces/i_category";
import { i_jobProfile } from "./i_jobProfile";

export interface i_jobDetails{
    _id?:string,
    client_id?:string,
    category?: i_category,
    categoryName?:string,
    experience:string,
    requiredCount: string,
    wage:number,
    jobDescription:string,
    subImage?:string,
    startDate:Date,
    endDate: Date,
    location:string,
    coordinates:number[]
}

 enum e_jobStatus{
    Active='active',
    Inactive='inActive'
}

export interface i_applicantsData{
    _id: string,
    job_id: string,
    applicant_id: string,
    createdAt: Date,
    profileData:i_jobProfile
}

export interface i_postedJobs extends i_jobDetails{
    postDate:Date,
    currentStatus:e_jobStatus,
    applicants:i_applicantsData,
    applicantCount:number
}

    
    