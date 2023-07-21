import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";



export interface userState{
    userDatas:i_UserDetails|null,
}

export interface AuthState {
    auth: userState;
  }

