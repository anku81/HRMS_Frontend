import axios from "axios";

export const axiosInstance =  axios.create({})

export const apiConnector = (method,Url,bodyData,headers,params)=>{

    return axiosInstance({
        method : method,
        url : Url,
        data : bodyData ? JSON.stringify(bodyData) : null,
        headers : headers ? headers :  {
            "Content-type": "application/json; charset=UTF-8"},
        params : params ? params : null
    })
   
}