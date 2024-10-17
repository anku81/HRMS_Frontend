import { useEffect } from "react";
import { apiConnector } from "../apiConnector";
import { AsideBarEndPoints } from "../apis";


const {ASIDE} = AsideBarEndPoints

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
            
                navigate("/", {
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