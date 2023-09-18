import { createReducer, on } from "@ngrx/store";
import { adminState } from "./admin.state";
import {adminLogOut, adminLogin, blockUser, getAllCategory, getAllusers, userSearch } from "./admin.actions";

const initialState: adminState = {
    datas: null,
    category:null,
    isLoggedIn:false
}

export const adminDataReducer = createReducer(
    initialState,
  
    on(adminLogin, (state, { isLoggedIn }) => ({
      ...state,
      isLoggedIn: isLoggedIn
    })),
    on(adminLogOut, (state, { isLoggedIn }) => ({
      ...state,
      isLoggedIn: isLoggedIn
    })),
    on(getAllusers, (state, { userDatas }) => ({
      ...state,
      datas: userDatas
    })),
    on(blockUser, (state, { _id }) => ({ 
      ...state,
      datas: state.datas?.map(user => user._id === _id ? { ...user, blockStatus: !user.blockStatus } : user) || null
    })),
    on(userSearch,(state,{keyWord})=>({
      ...state,
      datas:state.datas?.filter(user=>user.name.includes(keyWord))||null
    })),
    on(getAllCategory,(state,{categories})=>({
      ...state,
      category:categories
    }))
  );




