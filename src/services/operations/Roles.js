import { setRolesData } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { RoleEndPoints } from "../apis";

const {ALLRoles,ADD_ROLE,EDIT_ROLE,DELETE_ROLE} = RoleEndPoints


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

export const addRole  = (title,accessList)=>{
    return async(dispatch)=>{
        try
        {
            const token = localStorage.getItem("token")
        
            const body = {
                title : title,
                accessList:accessList
            }
            const response = await apiConnector("POST",ADD_ROLE,body,{
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

export const editRole  = (roleId,title,accessList)=>{
    return async(dispatch)=>{
        try
        {
            const token = localStorage.getItem("token")
            const newUrl = `${EDIT_ROLE}/${roleId}`
            const body = {
                title : title,
                accessList:accessList
            }
            const response = await apiConnector("PUT",newUrl,body,{
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

export const deleteRole  = (roleId)=>{
    return async(dispatch)=>{
        try
        {
            const token = localStorage.getItem("token")
            const newUrl = `${DELETE_ROLE}/${roleId}`
           
            const response = await apiConnector("DELETE",newUrl,{},{
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