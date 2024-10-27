import { setDepartments, setFilteredDepartments } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { DepartmentEndPoints } from "../apis";


const{ALLDEPARTMENTS,UNASSIGNED_DEPARTMENTS,DEPARTMENTBYORGANIZATION,
    ADD_DEPARTMENT,EDIT_DEPARTMENT,DELETE_DEPARTMENT,ASSIGN_BRANCH_TO_DEPARTMENT,
    REMOVE_BRANCH_FROM_DEPARTMENT,ASSIGN_ORGANIZATION_TO_DEPARTMENT,REMOVE_ORGANIZATION_FROM_DEPARTMENT} = DepartmentEndPoints


export const getAllDepartments = (page=1,limit=10)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${ALLDEPARTMENTS}/?page=${page}&limit=${limit}`
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                dispatch(setDepartments(response.data.data))
            }
        }catch(err){
            console.log(err)
        }
    }
}

export const getUnassignedDepartments = (page=1,limit=10)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${UNASSIGNED_DEPARTMENTS}/?page=${page}&limit=${limit}`
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                dispatch(setFilteredDepartments(response.data.data))
            }
        }catch(err){
            console.log(err)
        }
    }
}

export const getDepartmentsByOrganization= (organizationId,page=1,limit=10)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${DEPARTMENTBYORGANIZATION}/${organizationId}/?page=${page}&limit=${limit}`
            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                dispatch(setFilteredDepartments(response.data.data))
            }
        }catch(err){
            console.log(err)
        }
    }
}

export const addDepartment = (name,description,customAttributes,organizationId,managerId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(name,description,customAttributes,organizationId,managerId)
            const newUrl = `${ADD_DEPARTMENT}/${organizationId}/${managerId}`
            const token = localStorage.getItem("token")
            const body ={
                name : name,
                description:description,
                customAttributes : customAttributes
            }
            const response = await apiConnector("POST",newUrl,body,{
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

export const editDepartment = (name,description,customAttributes,managerId,departmentId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(name,description,customAttributes,managerId,departmentId)
            const newUrl = `${EDIT_DEPARTMENT}/${managerId}/${departmentId}`
            const token = localStorage.getItem("token")
            const body ={
                name : name,
                description:description,
                customAttributes : customAttributes
            }
            const response = await apiConnector("PUT",newUrl,body,{
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

export const deleteDepartment = (departmentId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(departmentId)
            const newUrl = `${DELETE_DEPARTMENT}/${departmentId}`
            const token = localStorage.getItem("token")
          
            const response = await apiConnector("DELETE",newUrl,{},{
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

export const assignBranchToDepartment = (departmentId,branchId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(departmentId)
            const newUrl = `${ASSIGN_BRANCH_TO_DEPARTMENT}/${departmentId}/${branchId}`
            const token = localStorage.getItem("token")
          
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

export const assignOrganizationToDepartment = (departmentId,organizationId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(departmentId)
            const newUrl = `${ASSIGN_ORGANIZATION_TO_DEPARTMENT}/${departmentId}/${organizationId}`
            const token = localStorage.getItem("token")
          
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

export const removeBranchFromDepartment = (departmentId,branchId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(departmentId)
            const newUrl = `${REMOVE_BRANCH_FROM_DEPARTMENT}/${departmentId}/${branchId}`
            const token = localStorage.getItem("token")
          
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

export const removeOrganizationFromDepartment = (departmentId,organizationId)=>{
      
    return async(dispatch)=>{
        try{
            console.log(departmentId)
            const newUrl = `${REMOVE_ORGANIZATION_FROM_DEPARTMENT}/${departmentId}/${organizationId}`
            const token = localStorage.getItem("token")
          
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