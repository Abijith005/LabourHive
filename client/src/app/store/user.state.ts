import { i_jobProfile } from "../interfaces/userInterfaces/i_jobProfile";
import { i_UserDetails } from "../interfaces/userInterfaces/i_user-details";



export interface userState{
    userDatas:i_UserDetails|null,
    jobProfileDatas:i_jobProfile|null
}

export interface userDataState {
    user: userState;
  }

