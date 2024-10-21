import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    organizations : [],
    subOrganizations : [],
    departments : [],
    filteredSubOrganizations:[]
}
const asideSlice = createSlice({
    name : "Aside",
    initialState : initialState,
    reducers : {
        setOrganizations : (state,action)=>{
            
            
            state.organizations = action.payload
        },
        setSubOrganizations : (state,action)=>{
            console.log("SLICEEE----->>>>",action.payload)
            state.subOrganizations = action.payload
        },
        setFilteredSubOrganizations : (state,action)=>{
            console.log("SLICEEE----->>>>",action.payload)
            state.filteredSubOrganizations = action.payload
        },
        setDepartments : (state,action)=>{
            state.departments = action.payload
        },
    }
})

export const {setOrganizations,setSubOrganizations,setDepartments,setFilteredSubOrganizations}=asideSlice.actions
export default asideSlice.reducer