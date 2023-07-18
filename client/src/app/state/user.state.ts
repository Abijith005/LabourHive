import { registerDatas, userDetails } from "../interfaces/user-interfaces";



export interface userState{
    userDatas:userDetails|null,
}

export interface AppState {
    auth: userState;
  }
  