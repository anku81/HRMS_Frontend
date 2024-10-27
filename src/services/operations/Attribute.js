import { setDepartmentAttributes, setEmployeeAttributes, setOrganizationAttributes, setSubOrganizationAttributes } from "../../redux/slices/attributeSlice";
import { apiConnector } from "../apiConnector";
import { Attribute_EndPoints } from "../apis";

const {GET_CUSTOMATTRIBUTES,ADD_CUSTOMATTRIBUTES,EDIT_CUSTOMATTRIBUTES,DELETE_CUSTOMATTRIBUTES} = Attribute_EndPoints

export const getAttributes = (parent)=>{
    return async(dispatch)=>{
        try{
            console.log("parent===========>>>>>",parent)
            const token = localStorage.getItem("token")
            const body = {
                parent:parent
            }
            const response = await apiConnector("POST",GET_CUSTOMATTRIBUTES,body,{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
            if(response.data.success)
            {


                if(response?.data?.data?.parent=="Organization")
                {
                    dispatch(setOrganizationAttributes(response?.data?.data?.attributeList))
                }
                else if(response?.data?.data?.parent=="SubOrganization")
                    {
                        dispatch(setSubOrganizationAttributes(response?.data?.data?.attributeList))
                    }
                    else if(response?.data?.data?.parent=="Employee")
                        {
                            dispatch(setEmployeeAttributes(response?.data?.data?.attributeList))
                        }
                        else
                            {
                                dispatch(setDepartmentAttributes(response?.data?.data?.attributeList))
                            }


                
            }
        } catch (err){
            console.log(err)
        }
    }
}

export const addAttribute = (title,parent)=>{
    console.log({title:title,parent:parent})
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const response = await apiConnector("POST",ADD_CUSTOMATTRIBUTES,{customAttribute:title,parent:parent},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log(response)
            if(response.data.success)
            {
               
            }
        } catch (err){
            console.log(err)
        }
    }
}

export const editAttribute = (title,parent,attributrId)=>{
    return async(dispatch)=>{
        console.log({title,parent,attributrId})
        try{
            const token = localStorage.getItem("token")
                const newUrl = `${EDIT_CUSTOMATTRIBUTES}/${attributrId}`
            const response = await apiConnector("PUT",newUrl,{customAttribute:title,parent:parent},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log(response)
        } catch (err){
            console.log(err)
        }
    }
}

export const deleteAttribute = (parent,attributrId)=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${DELETE_CUSTOMATTRIBUTES}/${attributrId}`
            const response = await apiConnector("DELETE",newUrl,{parent:parent},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })
            console.log(response)
        } catch (err){
            console.log(err)
        }
    }
}