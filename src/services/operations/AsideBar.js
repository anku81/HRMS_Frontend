import { useEffect } from "react";
import { apiConnector } from "../apiConnector";
import { AsideBarEndPoints } from "../apis";
import { setFilteredSubOrganizations, setIsLastOrg, setIsLastSubOrg, setOrganizations, setSubOrganizations } from "../../redux/slices/asideSlice";


const {ASIDE,ORGANIZATIONLIST,SUBORGANIZATIONLIST,
    SUBORGANIZATIONSBYORGANIZATIONS,UNASSIGNEDSUBORGANIZATIONS
} = AsideBarEndPoints

export const getAsideTabs = (navigate)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET",ASIDE,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log(response.data.data)
            if(response.data.success)
            {
                localStorage.setItem("asideBar",JSON.stringify(response.data.data))
                
                navigate("/home", {
                    state: { tabData: response.data.data },
                    replace: true
                  });
        
            }
            else {
                
                console.error("Request failed:", response.data.message);
              }
          
          
        } catch (err)
        {
            console.log(err)
        }
    }
}

export const getOrganizations = (page)=>{

    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${ORGANIZATIONLIST}/?page=${page ?? 1}&limit=${10}`
            console.log(newUrl,token)
    
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log("+++++++++++Here",response)

            if(response.data.success)
            {
               response.data?.isLast ? dispatch(setIsLastOrg(true)) : dispatch(setIsLastOrg(false))

                response.data.data && dispatch(setOrganizations(response.data.data))
               
              
            }
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}

export const getSubOrganizations = (page=1,limit=10)=>{

    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${SUBORGANIZATIONLIST}/?page=${page}&limit=${limit}`
            console.log(newUrl,token)
    
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log("+++++++++++SubOrg",response)
            if(response.data.success)
            {
                dispatch(setSubOrganizations(response.data.data))
                
            }
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}

export const getSubOrganizationsByOrganizations = (organizationId,page=1)=>{

    return async(dispatch)=>{
        try{
            
            
            const token = localStorage.getItem("token")
            const newUrl = `${SUBORGANIZATIONSBYORGANIZATIONS}/${organizationId}/?page=${page}&limit=${10}`
            console.log(newUrl,token)
    
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log("+++++++++++SubOrg",response)
            if(response.data.success)
            {
                response.data?.isLast ? dispatch(setIsLastSubOrg(true)) : dispatch(setIsLastSubOrg(false))
                dispatch(setFilteredSubOrganizations(response.data.data))
                
            }
    
        
        } catch (err){
            console.log(err)
        }
     
       }
   
}

export const getUnassignedSubOrganizations =(page)=>{
    return async(dispatch)=>{
        try{
            const newUrl = `${UNASSIGNEDSUBORGANIZATIONS}/?page=${page ?? 1}&limit=${10}`
            console.log("UNASSISBHSBBK",newUrl)
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                response.data?.isLast ? dispatch(setIsLastSubOrg(true)) : dispatch(setIsLastSubOrg(false))

                dispatch(setFilteredSubOrganizations(response.data.data))
            }
        } catch (err){

    }
}
}