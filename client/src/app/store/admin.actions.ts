import { createAction, props } from "@ngrx/store";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";
import { i_categoryResponse } from "../interfaces/adminInterfaces/i_categoryResponse";

export const adminLogin=createAction('[Login]adminLogin',props<{isLoggedIn:boolean}>())

export const adminLogOut=createAction('[Login]adminLogOut',props<{isLoggedIn:boolean}>())

export const getAllusers=createAction('[GetData]getAllUsers',props<{userDatas:i_UserDetails[]|null}>())

export const blockUser=createAction('[GetData]blockUser',props<{_id:string}>())

export const userSearch=createAction('[GetData]serach',props<{keyWord:string}>())

export const getAllCategory=createAction('[GetData]getAllCategories',props<{categories:i_categoryResponse[]|null}>())



