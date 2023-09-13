import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { jobProfile, logOut, login, updateProfile } from "./user.actions";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";


const initialState:userState={
    userDatas:null,
    jobProfileDatas:null
}
 
export const authReducer = createReducer(initialState,
    on(login,(state,{userDatas})=>({
        ...state,
        userDatas:userDatas,
      })
    ),
    on(jobProfile,(state,{profileDatas})=>({
      ...state,
      jobProfileDatas:profileDatas
    })),
    on(updateProfile,(state,{data})=>({
      ...state,
      userDatas:{
        ...state.userDatas,
        ...data as i_UserDetails,
      }
    })),
    on(logOut,(state)=>({
      ...state,
      userDatas:null,
      jobProfileDatas:null

    })),
   
    )
  