import { createAction, props } from "@ngrx/store";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";

export const login=createAction('[Auth]login',props<{userDatas:i_UserDetails|null}>())
export const sample=createAction('[Auth]login',props<{userDatas:i_UserDetails[]|null}>())
