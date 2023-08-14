export interface i_jobDetails{
    client_id?:string,
    category: string,
    experience:string,
    requiredCount: string,
    wage:number,
    jobDescription:string,
    startDate:Date,
    endDate: Date,
    location:string,
    coordinates:number[]
}
