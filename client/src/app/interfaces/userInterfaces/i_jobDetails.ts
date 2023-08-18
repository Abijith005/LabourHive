import { i_category } from "../adminInterfaces/i_category";

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
