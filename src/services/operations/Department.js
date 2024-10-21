import { setDepartments, setFilteredDepartments } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { DepartmentEndPoints } from "../apis";


const{ALLDEPARTMENTS,UNASSIGNED_DEPARTMENTS,DEPARTMENTBYORGANIZATION} = DepartmentEndPoints


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

// module.exports ={getAllDepartments,getUnassignedDepartments,getDepartmentsByOrganization}