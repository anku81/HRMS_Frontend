import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    organizations : [],
    subOrganizations : [],
    departments : [],
    employees :[],
    filteredSubOrganizations:[],
    filteredDepartments : [],
    roles : [],
    filteredEmployees :[],
    searchList : [],
    accessList:[],
    isLastOrg :false,
    isLastSubOrg :false,
    isLastDep :false,
    isLastEmp :false,
    attendenceData : [],
    skillsData : [],
 
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
            console.log(action.payload)
            state.roles = action.payload
        },
        setEmployees : (state,action)=>{
            state.employees = action.payload
        },
        setFilteredEmployees : (state,action)=>{
            state.filteredEmployees = action.payload
        },
        setSearchList : (state,action)=>{
          
            state.searchList = action.payload

        },
        setAccessList : (state,action)=>{
          
            state.accessList = action.payload

        },
        setIsLastOrg : (state,action)=>{
            state.isLastOrg = action.payload
        },
        setIsLastSubOrg : (state,action)=>{
            state.isLastSubOrg = action.payload
        },
        setIsLastDep : (state,action)=>{
            state.isLastDep = action.payload
        },
        setIsLastEmp : (state,action)=>{
            state.isLastEmp = action.payload
        },
        setAttendenceData : (state,action)=>{
            state.attendenceData = action.payload
        },
        setskillsData : (state,action)=>{
            state.skillsData = action.payload
        }
       
    }
})

export const {setOrganizations,setSubOrganizations,setDepartments,setFilteredSubOrganizations,setFilteredDepartments,setRolesData,setEmployees,setFilteredEmployees,setSearchList,setAccessList,setIsLastOrg,setIsLastSubOrg,setIsLastDep,setIsLastEmp,setAttendenceData,setskillsData}=asideSlice.actions
export default asideSlice.reducer