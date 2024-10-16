import axios from "axios";

export const axiosInstance = axios({})

export const apiConnector = (method,Url,body,header,params)=>{
    method : method
    Url : Url
    bodyData : body ? body : null
    header : header ? header : null
    params : params ? params : null
}