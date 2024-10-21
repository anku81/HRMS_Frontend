import { setRolesData } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { RoleEndPoints } from "../apis";

const {ALLRoles} = RoleEndPoints

export const getAllRoles  = (page =1,limit =10)=>{
    return async(dispatch)=>{
        try
        {
            const token = localStorage.getItem("token")
            const newUrl = `${ALLRoles}/?page=${page}&limit=${limit}`
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                dispatch(setRolesData(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}