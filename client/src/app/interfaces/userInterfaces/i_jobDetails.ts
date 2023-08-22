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
    coordinates:number[],
    [key: string]: any;
}

export interface i_applicantsData{
    _id: string,
    job_id: string,
    applicant_id: string,
    createdAt: Date,
    applicationStatus:string,
    profileData:i_jobProfile
}

export interface i_postedJobs extends i_jobDetails{
    postDate:Date,
    updatedDate:Date
    currentStatus:string,
    applicants:i_applicantsData,
    applicantCount:number
}

export interface i_engagedJobs {
_id:string,
job_id:{
    _id:string,
    experience:string,
    jobDescription:string,
    createdAt:Date
},
client_id:{
    _id:string,
    name:string
},
labour_id:string,
hiringDate:Date,
category:string,
totalDays:number,
startDate:Date,
endDate:Date,
location:string
coordinates:number[],
totalAmount:number,
offeredWage:number,
}