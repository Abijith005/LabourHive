import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { login } from "./user.actions";


const initialState:userState={
    userDatas:null
}
 
export const authReducer = createReducer(initialState,
    on(login,(state,{userDatas})=>({
        ...state,
        userDatas:userDatas,
      })
    ),
    )
  