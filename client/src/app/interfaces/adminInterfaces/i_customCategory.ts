import { i_categoryResponse } from "./i_categoryResponse";

export interface i_customCategory{
    success:boolean,
    message:string,
    categories?:i_categoryResponse[]
}