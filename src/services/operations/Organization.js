import { apiConnector } from "../apiConnector";
import { Organization_EndPoints } from "../apis";

const {ADD_ORGANIZATION,DELETE_ORGANIZATION,EDIT_ORGANIZATION} = Organization_EndPoints

export const addOrganization = (name,description,customAttributes,logo)=>{

    return async(dispatch)=>{
        try{
           
            console.log(name,description,customAttributes,logo)
            const formData = new FormData();
            formData.append("logo",logo)
            formData.append("name",name)
            formData.append("description",description)
            formData.append(`customAttributes`, JSON.stringify(customAttributes));
            // formData.append("customAttributes",customAttributes)


        

            const token = localStorage.getItem("token")
        
            const response = await apiConnector("POST",ADD_ORGANIZATION,formData,{
              
                "Authorization" : `Bearer ${token}`
            })
           
          console.log(response)
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}

export const editOrganization = (name,description,customAttributes,logo,organizationId)=>{

    return async(dispatch)=>{
        try{
           
            console.log(name,description,customAttributes,logo)
            const formData = new FormData();
            formData.append("logo",logo)
            formData.append("name",name)
            formData.append("description",description)
            formData.append(`customAttributes`, JSON.stringify(customAttributes));
            // formData.append("customAttributes",customAttributes)


        

            const token = localStorage.getItem("token")
            const newUrl = `${EDIT_ORGANIZATION}/${organizationId}`
            const response = await apiConnector("PUT",newUrl,formData,{
              
                "Authorization" : `Bearer ${token}`
            })
           
          console.log(response)
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}

export const deleteOrganization = (organizationId)=>{

    return async(dispatch)=>{
        try{
           const newUrl = `${DELETE_ORGANIZATION}/${organizationId}`
            console.log(newUrl,organizationId)
          

        

            const token = localStorage.getItem("token")
        
            const response = await apiConnector("DELETE",newUrl,{},{
              
                "Authorization" : `Bearer ${token}`
            })
           
          console.log(response)
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}
