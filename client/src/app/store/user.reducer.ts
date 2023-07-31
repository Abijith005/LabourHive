import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { jobProfile, login } from "./user.actions";


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
    }))
    )
  