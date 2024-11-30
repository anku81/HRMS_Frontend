import { setskillsData } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { skill_EndPoints } from "../apis";

const {GET_ALL_SKILLS,ADD_SKILLS,UPDATE_SKILL,DELETE_SKILL} = skill_EndPoints

export const getAllSkill = ()=>{
    return async(dispatch)=>{
        try{
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET",GET_ALL_SKILLS,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            if(response.data.success)
            {
                dispatch(setskillsData(response.data.data))
            }
        } catch(err)
        {
            console.log(err)
        }
    }
}

export const addSkill = (title)=>{
    return async()=>{
        try{
         const token = localStorage.getItem("token")
         console.log(token,ADD_SKILLS)

            const response = await apiConnector("POST",ADD_SKILLS,{title : title},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)
        } catch(err)
        {
            console.log(err)
        }
    }
}

export const editSkill = (skillId,title)=>{
    console.log(skillId,title)
    return async()=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${UPDATE_SKILL}/${skillId}`

            console.log(newUrl,title)
            const response = await apiConnector("PUT",newUrl,{title : title},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

            // if(response.data.success)
            // {
                
            // }

        } catch(err)
        {
            console.log(err)
        }
    }
}

export const deleteSkill = (skillId)=>{
    return async()=>{
        try{
            const token = localStorage.getItem("token")
            const newUrl = `${DELETE_SKILL}/${skillId}`

            console.log(newUrl)
            const response = await apiConnector("Delete",newUrl,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

            console.log(response)

        } catch(err)
        {
            console.log(err)
        }
    }
}