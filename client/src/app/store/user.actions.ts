import { createAction, props } from "@ngrx/store";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";
import { i_jobProfile } from "../interfaces/userInterfaces/i_jobProfile";
interface profileData {
    name?: string;
    email?: string;
    mobileNumber?: string;
    profilePicture?: string;
  }

export const login=createAction('[user]login',props<{userDatas:i_UserDetails|null}>())
export const jobProfile=createAction('[user]jobProfile',props<{profileDatas:i_jobProfile|null}>())
export const updateProfile=createAction('[user]updateProfile',props<{data:profileData|null}>())
export const logOut=createAction('[user]logOut')
