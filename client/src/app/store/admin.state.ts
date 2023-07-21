import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";

export interface adminState{
    datas:i_UserDetails[]|null
}

export interface adminDataState{
    adminData:adminState
    
}