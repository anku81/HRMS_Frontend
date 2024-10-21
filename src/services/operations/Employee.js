import { setEmployees, setFilteredEmployees } from "../../redux/slices/asideSlice"
import { setName, setProfilePicture, setRole } from "../../redux/slices/userSlice"
import { apiConnector } from "../apiConnector"
import { AuthEndpoints } from "../apis"



const {GETUSERBYID,GET_ALL_EMPLOYEES,GET_EMPLOYEES_BY_DEPARTMENT} = AuthEndpoints

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