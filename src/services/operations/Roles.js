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

export const addRole  = (title,accessList,selectedCategories)=>{
    return async(dispatch)=>{
        try
        {
            console.log(title,accessList,selectedCategories)
            const token = localStorage.getItem("token")
        
            const body = {
                title : title,
                roleAccessList:accessList,
                selectedCategories : selectedCategories
            }
            console.log(ADD_ROLE,body)
            const response = await apiConnector("POST",ADD_ROLE,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                // dispatch(setRolesData(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const editRole  = (roleId,title,accessList,selectCategory)=>{
    return async(dispatch)=>{
        try
        {
            console.log(roleId,title,accessList,selectCategory)
            const token = localStorage.getItem("token")
            const newUrl = `${EDIT_ROLE}/${roleId}`
            const body = {
                title : title,
                roleAccessList:accessList,
                selectedCategories : selectCategory
            }
        console.log(body)
            const response = await apiConnector("PUT",newUrl,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            // if(response.data.success)
            // {
                
            // }
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
            // if(response.data.success)
            // {
                
            // }
        } catch(err){
            console.log(err)
        }
    }
}