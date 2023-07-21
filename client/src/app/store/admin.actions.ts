import { createAction, props } from "@ngrx/store";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";

export const getAllusers=createAction('[GetData]getAllUsers',props<{userDatas:i_UserDetails[]|null}>())

export const blockUser=createAction('[GetData]blockUser',props<{_id:string}>())

export const userSearch=createAction('[GetData]serach',props<{keyWord:string}>())



