import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    organization : [],
    subOrganization : [],
    department : [],
    employee : []
}

const attributeSlice = createSlice({
    name : "Attribute",
    initialState : initialState,
    reducers : {
        setOrganizationAttributes : (state,action)=>{
            state.organization = action.payload
        },
        setSubOrganizationAttributes : (state,action)=>{
            state.subOrganization = action.payload
        },
        setDepartmentAttributes : (state,action)=>{
            state.department = action.payload
        },
        setEmployeeAttributes : (state,action)=>{
            state.employee = action.payload
        }
    }
})

export const {setOrganizationAttributes,setSubOrganizationAttributes,setDepartmentAttributes,setEmployeeAttributes} = attributeSlice.actions
export default attributeSlice.reducer