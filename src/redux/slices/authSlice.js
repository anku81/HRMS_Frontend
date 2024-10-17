import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn")==="true"  ? true : false 
}
const authSlice = createSlice({
    name : "Auth",
    initialState : initialState,
    reducers : {
        setLoggedIn : (state,action)=>{
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn = action.payload
        }
    }
})

export const {setLoggedIn} = authSlice.actions
export default authSlice.reducer