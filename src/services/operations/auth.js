import { apiConnector } from "../apiConnector"
import { AuthEndpoints } from "../apis"
const{LOGIN} = AuthEndpoints


export const login = async(username,password,navigate)=>{
   

return async()=>{
    const body = {

    }
    console.log(username,password)
    // const response = apiConnector("POST",LOGIN,body)

    navigate("/")
}
}