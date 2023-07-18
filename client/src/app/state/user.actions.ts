import { createAction, props } from "@ngrx/store";
import { userDetails } from "../interfaces/user-interfaces";

export const login=createAction('[Auth]login',props<{userDatas:userDetails|null}>())