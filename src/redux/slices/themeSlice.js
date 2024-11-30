import { createSlice } from "@reduxjs/toolkit";


 const themeSlice = createSlice({
    name : "Theme",
    initialState : {
        theme : JSON.parse(localStorage.getItem("Theme"))
    },
    reducers : {
        setTheme : (state,action)=>{
            localStorage.setItem("Theme",JSON.stringify(action.payload))
           state.theme = action.payload
        }
    }
    
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer