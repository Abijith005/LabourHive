export interface i_jobProfile {

    name: string,
    category: string,
    wage: string,
    experience: string,
    profilePic: string,
    selfDescription: string,
    location: string,
    coordinates:number[]
    workImages: string[],
    rating?:number
}