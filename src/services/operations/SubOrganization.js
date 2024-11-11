import { apiConnector } from "../apiConnector";
import { Sub_Organization_EndPoints } from "../apis";

const {ADD_SUB_ORGANIZATION,EDIT_SUB_ORGANIZATION,DELETE_SUB_ORGANIZATION,ASSIGN_ORGANIZATION_TO_SUBORGANIZATION,REMOVE_ORGANIZATION_FROM_SUBORGANIZATION} = Sub_Organization_EndPoints

export const addSubOrganization = (name,customAttributes,organizationId)=>{
  return async()=>{
    try{
        console.log(name,customAttributes,organizationId)

        const newUrl = `${ADD_SUB_ORGANIZATION}/${organizationId}`
        console.log(newUrl)
        const token = localStorage.getItem("token")

        const response = await apiConnector("POST",newUrl,{
            name:name,
            customAttributes:customAttributes
        },{
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${token}`
        })

        console.log(response)

    } catch (err){
        console.log(err)
    }
  }
}

export const deleteSubOrganization = (organizationId,subOrganizationId)=>{
  return async()=>{
    try{
         const newUrl = `${DELETE_SUB_ORGANIZATION}/${organizationId}/${subOrganizationId}`
        const token = localStorage.getItem("token")

        const response = await apiConnector("DELETE",newUrl,{},{
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${token}`
        })

        console.log(response)
    } catch (err){
        console.log(err)
    }
  }
}

export const editSubOrganization = (name,customAttributes,branchId)=>{
    return async()=>{
        try{
            console.log(name,customAttributes,branchId)
    
            const newUrl = `${EDIT_SUB_ORGANIZATION}/${branchId}`
            console.log(newUrl)
            const token = localStorage.getItem("token")
    
            const response = await apiConnector("PUT",newUrl,{
                name:name,
                customAttributes:customAttributes
            },{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
    
            console.log(response)
    
        } catch (err){
            console.log(err)
        }
      }
}

export const assignOrganizationToSubOrganization = (branchId,organizationId)=>{
      
    return async(dispatch)=>{
        try{
        
            const newUrl = `${ASSIGN_ORGANIZATION_TO_SUBORGANIZATION}/${branchId}/${organizationId}`
            const token = localStorage.getItem("token")
            console.log(branchId,organizationId,newUrl)
            const response = await apiConnector("PATCH",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            // if(response.data.success)
            // {
               
            // }

        } catch (err){
            console.log(err)
        }
    }
}

export const removeOrganizationFromSubOrganization = (branchId,organizationId)=>{
      
    return async(dispatch)=>{
        try{
           
            const newUrl = `${REMOVE_ORGANIZATION_FROM_SUBORGANIZATION}/${branchId}/${organizationId}`
            const token = localStorage.getItem("token")
          console.log(newUrl)
            const response = await apiConnector("PATCH",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            // if(response.data.success)
            // {
               
            // }

        } catch (err){
            console.log(err)
        }
    }
}