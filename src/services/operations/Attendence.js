import { setAttendenceData } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { Attendence_EndPoints } from "../apis";

const {ADD_TIMING,ADD_LOCATION,GET_ATTENDENCE} = Attendence_EndPoints

export const addTiming = (hours,minutes)=>{
    return async()=>{
        try{
            const body = {
                hours : hours,
                minutes : minutes
            }
            const token = localStorage.getItem("token")
            console.log(body,token)
            const response = await apiConnector("POST",ADD_TIMING,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
        } catch(err){
            console.log(err)
        }
    }
}

export const addLocation = (name,latitude,longitude)=>{
    return async()=>{
        try{
    
            const body = {
               name,latitude,longitude
            }
            const token = localStorage.getItem("token")
            console.log(body,token)
            const response = await apiConnector("POST",ADD_LOCATION,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
        } catch(err){
            console.log(err)
        }
    }
}

export const getAttendenceData = ()=>{
    return async(dispatch)=>{
        try{
            console.log("HERE")
            const token = localStorage.getItem("token")
            console.log(token)
            const response = await apiConnector("GET",GET_ATTENDENCE,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response?.data?.success)
            {
                dispatch(setAttendenceData(response?.data?.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}