import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    organizations : [],
    subOrganizations : [],
    departments : [],
    employees :[],
    filteredSubOrganizations:[],
    filteredDepartments : [],
    roles : [],
    filteredEmployees :[]
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
        setFilteredDepartments:(state,action)=>{
            state.filteredDepartments = action.payload
        },
        setRolesData : (state,action)=>{
            state.roles = action.payload
        },
        setEmployees : (state,action)=>{
            state.employees = action.payload
        },
        setFilteredEmployees : (state,action)=>{
            state.filteredEmployees = action.payload
        },
    }
})

export const {setOrganizations,setSubOrganizations,setDepartments,setFilteredSubOrganizations,setFilteredDepartments,setRolesData,setEmployees,setFilteredEmployees}=asideSlice.actions
export default asideSlice.reducer