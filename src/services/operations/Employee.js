import { setEmployees, setFilteredEmployees, setIsLastEmp, setSearchList } from "../../redux/slices/asideSlice"
import { setName, setProfilePicture, setRole } from "../../redux/slices/userSlice"
import { apiConnector } from "../apiConnector"
import { AuthEndpoints, Employee_EndPoints } from "../apis"



const {GETUSERBYID,GET_ALL_EMPLOYEES,GET_EMPLOYEES_BY_DEPARTMENT} = AuthEndpoints
const {GET_EMPLOYEES_BY_NAME,GET_EMPLOYEES_BY_PDetails,ADD_EMPLOYEE,ADD_PERSONAL_DETAILS,ADD_ADDITIONAL_DETAILS,EDIT_PERSONAL_DETAILS,EDIT_ADDITIONAL_DETAILS,DELETE_EMPLOYEE,ASSIGN_DEPARTMENT_TO_EMPLOYEE,REMOVE_EMPLOYEE_FROM_DEPARTMENT} = Employee_EndPoints


export const getUserById = ()=>{
    return async(dispatch)=>{
        const token = localStorage.getItem("token")
        const response = await apiConnector("GET",`${GETUSERBYID}/${null}`,{},{
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
        console.log(`${GETUSERBYID}/${userId}`)
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
export const getAllEmployees = (page)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${GET_ALL_EMPLOYEES}/?page=${page ?? 1}&limit=${10}`

            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                response?.data?.isLast ? dispatch(setIsLastEmp(true)) : dispatch(setIsLastEmp(false))
                dispatch(setFilteredEmployees(response.data.data))
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const getEmployeesByDepartment = (departmentId,page)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${GET_EMPLOYEES_BY_DEPARTMENT}/${departmentId}/?page=${page ?? 1}&limit=${10}`

            const response = await apiConnector("GET",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response,response?.data?.isLast)

            if(response.data.success)
            {
                console.log( response?.data?.isLast)
                response?.data?.isLast ? dispatch(setIsLastEmp(true)) : dispatch(setIsLastEmp(false))
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

export const addEmployee = (email,password,organizationId,roleId,setUserId,setFormState)=>{
    return async(dispatch)=>{
        try{
            
            const newUrl = `${ADD_EMPLOYEE}/${organizationId}/${roleId}`
            const body = {
                email : email,
                password : password
            }
            console.log(body,newUrl)

            const token = localStorage.getItem("token")
            const response = await apiConnector("POST",newUrl,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                setUserId(response.data.data)
                setFormState(2)
            }
        } catch (err){

        }
    }
}

export const addEmployeePersonalDetails = (file,firstName,lastName,employeeCode,departmentId,skills,designation,customAttributes,userId,setFormState)=>{
    return async(dispatch)=>{
        try{
            const newUrl = `${ADD_PERSONAL_DETAILS}/${userId}`
            console.log(file,firstName,lastName,employeeCode,departmentId,customAttributes,userId,newUrl)
            // data.file[0],data.firstName,data.lastName,data.employeeCode,data.departmentId,userId,setFormState
            // data.file[0],datfirstName,data.lastName,data.employeeCode,data.departmentId,customAttributes,userId,setFormState
            console.log("HERE1")
            
            const formData = new FormData()
            formData.append("profilepicture",file)
            formData.append("firstName",firstName)
            formData.append("lastName",lastName)
            formData.append("employeeCode",employeeCode)
            formData.append("departmentId",departmentId)
            formData.append("skills",JSON.stringify(skills))
            formData.append("designation",designation)
            formData.append("customAttributes",JSON.stringify(customAttributes))

         console.log("HERE2")
     

            const token = localStorage.getItem("token")
            console.log("HERE3")
            const response = await apiConnector("POST",newUrl,formData,{
    
                "Authorization" : `Bearer ${token}`
            })
            console.log("HERE4")
            console.log(response)

            if(response.data.success)
            {
             
                setFormState(3)
            }
        } catch (err){

        }
    }
}

export const addEmployeeAdditionalDetails = (contact,relationShip,addressType,propertyNumber,city,zipCode,state,country,bankName,accountNumber,ifscCode,bankBranch,userId,setFormState)=>{
    return async(dispatch)=>{
        try{
            
            const newUrl = `${ADD_ADDITIONAL_DETAILS}/${userId}`
            const body = {
                contact,
                relationShip,
                addressType,
                propertyNumber,
                city,
                zipCode,
                state,
                country,
                bankName,
                accountNumber,
                ifscCode,
                bankBranch,
            }
            console.log(body,newUrl)

            const token = localStorage.getItem("token")
            const response = await apiConnector("POST",newUrl,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {
                
                setFormState(1)
            }
        } catch (err){

        }
    }
}

export const editEmployeePersonalDetails = (file,firstName,lastName,employeeCode,departmentId,skills,designation,customAttributes,userId,setFormState)=>{
    return async(dispatch)=>{
        try{
            const newUrl = `${EDIT_PERSONAL_DETAILS}/${userId}`
            console.log(file,firstName,lastName,employeeCode,departmentId,customAttributes,userId,newUrl)
            // data.file[0],data.firstName,data.lastName,data.employeeCode,data.departmentId,userId,setFormState
            // data.file[0],datfirstName,data.lastName,data.employeeCode,data.departmentId,customAttributes,userId,setFormState
            console.log("HERE1")
            
            const formData = new FormData()
            formData.append("newImage",file)
            formData.append("firstName",firstName)
            formData.append("lastName",lastName)
            formData.append("employeeCode",employeeCode)
            formData.append("department",departmentId)
            formData.append("skills",JSON.stringify(skills))
            formData.append("designation",designation)
            formData.append("customAttributes",JSON.stringify(customAttributes))

         console.log("HERE2")
     

            const token = localStorage.getItem("token")
            console.log("HERE3")
            const response = await apiConnector("PUT",newUrl,formData,{
    
                "Authorization" : `Bearer ${token}`
            })
            console.log("HERE4")
            console.log(response)

            if(response.data.success)
            {
             
                setFormState(3)
            }
        } catch (err){

        }
    }
}


export const deleteEmployee = (userId)=>{
    return async()=>{
        try{

            const newUrl = `${DELETE_EMPLOYEE}/${userId}`
           
        

            const token = localStorage.getItem("token")
            const response = await apiConnector("DELETE",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
          

        } catch (err){

        }
    }
}

export const editEmployeeAdditionalDetails = (userId,contact,relationShip,addressType,propertyNumber,city,zipCode,state,country,bankName,accountNumber,ifscCode,bankBranch)=>{
    return async(dispatch)=>{
        try{
            
            const newUrl = `${EDIT_ADDITIONAL_DETAILS}/${userId}`
            const body = {
                contact,
                relationShip,
                addressType,
                propertyNumber,
                city,
                zipCode,
                state,
                country,
                bankName,
                accountNumber,
                ifscCode,
                bankBranch,
            }
            console.log(body,newUrl)

            const token = localStorage.getItem("token")
            const response = await apiConnector("PUT",newUrl,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            // if(response.data.success)
            // {
                
              
            // }
        } catch (err){

        }
    }
}

export const assignDepartmentToEmployee = (userId,departmentId)=>{
    return async()=>{
        try{

           const newUrl = `${ASSIGN_DEPARTMENT_TO_EMPLOYEE}/${userId}/${departmentId}`
            const token = localStorage.getItem("token")
            console.log(newUrl)
            const response = await apiConnector("PATCH",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

        } catch(err){
            console.log(err)
        }
    }
}

export const removeDepartmentFromEmployee = (userId,departmentId)=>{
    return async()=>{
        try{

           const newUrl = `${REMOVE_EMPLOYEE_FROM_DEPARTMENT}/${userId}/${departmentId}`
            const token = localStorage.getItem("token")
            console.log(newUrl)
            const response = await apiConnector("PATCH",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

        } catch(err){
            console.log(err)
        }
    }
}