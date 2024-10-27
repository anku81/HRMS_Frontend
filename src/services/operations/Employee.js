import { setEmployees, setFilteredEmployees, setSearchList } from "../../redux/slices/asideSlice"
import { setName, setProfilePicture, setRole } from "../../redux/slices/userSlice"
import { apiConnector } from "../apiConnector"
import { AuthEndpoints, Employee_EndPoints } from "../apis"



const {GETUSERBYID,GET_ALL_EMPLOYEES,GET_EMPLOYEES_BY_DEPARTMENT} = AuthEndpoints
const {GET_EMPLOYEES_BY_NAME,GET_EMPLOYEES_BY_PDetails} = Employee_EndPoints
export const getUserById = ()=>{
    return async(dispatch)=>{
        const token = localStorage.getItem("token")
        const response = await apiConnector("GET",GETUSERBYID,{},{
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${token}`
        }
       )
       if(response.data.success)
       {
        const name = response.data.data.personalDetails.firstName + " " + response.data.data.personalDetails.lastName
        const role = response.data.data.role.title
        const profilePicture = response?.data?.data?.personalDetails?.profilePicture
        console.log("++++++++++profilePicture",profilePicture)
        localStorage.setItem("USER",JSON.stringify({name:name,role : role,profilePicture :profilePicture }))
        
        await dispatch(setName(name))
        await dispatch(setRole(role))
        await dispatch(setProfilePicture(profilePicture))
       }
       console.log(response)
    }
}

export const getEmployeeById = (userId)=>{
    return async(dispatch)=>{
        const token = localStorage.getItem("token")
        const response = await apiConnector("GET",`${GETUSERBYID}/${userId}`,{},{
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${token}`
        }
       )
       if(response.data.success)
       {
        dispatch(setEmployees(response.data.data))
       }
       console.log(response)
    }
}
export const getAllEmployees = (page=1,limit=10)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${GET_ALL_EMPLOYEES}/?page=${page}&limit=${limit}`

            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                dispatch(setFilteredEmployees(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const getEmployeesByDepartment = (departmentId,page=1,limit=10)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${GET_EMPLOYEES_BY_DEPARTMENT}/${departmentId}/?page=${page}&limit=${limit}`

            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                dispatch(setFilteredEmployees(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const getEmployeesByName = (name)=>{
    return async(dispatch)=>{
        try{
            console.log(name,GET_EMPLOYEES_BY_NAME)
            const token = localStorage.getItem("token")

            const response = await apiConnector("POST",GET_EMPLOYEES_BY_NAME,{name : name},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                dispatch(setSearchList(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}
export const getEmployeesByPID = (pDetailId)=>{
    return async(dispatch)=>{
        try{
            const newUrl = `${GET_EMPLOYEES_BY_PDetails}/${pDetailId}`
            console.log(newUrl,GET_EMPLOYEES_BY_PDetails)
            const token = localStorage.getItem("token")

            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                return response.data.data
            }
        } catch(err){
            console.log(err)
        }
    }
}