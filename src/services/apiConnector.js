import axios from "axios";

export const axiosInstance =  axios.create({})

export const apiConnector = (method,Url,bodyData,headers,params)=>{
    const isFormData = bodyData instanceof FormData;
    
    return axiosInstance({
        method : method,
        url : Url,
        data :isFormData ? bodyData :  bodyData ? JSON.stringify(bodyData) : null,
        headers : headers ? headers :  {
            "Content-type": "application/json; charset=UTF-8"},
        params : params ? params : null
    })
   
}