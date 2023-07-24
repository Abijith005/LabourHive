import { i_category } from "../interfaces/adminInterfaces/i_category";
import { i_categoryResponse } from "../interfaces/adminInterfaces/i_categoryResponse";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";

export interface adminState{
    datas:i_UserDetails[]|null,
    category:i_categoryResponse[]|null
}

export interface adminDataState{
    adminData:adminState
    
}