const BaseUrl = import.meta.env.VITE_BASE_URL;
export const AuthEndpoints = {
    LOGIN : BaseUrl+"/api/v1/auth/login",
    GETUSERBYID : BaseUrl+"/api/v1/getUserById",
    GET_ALL_EMPLOYEES : BaseUrl+"/api/v1/getEmployeeData",
    GET_EMPLOYEES_BY_DEPARTMENT : BaseUrl+"/api/v1/getEmployeeByDepartment"
}

export const AsideBarEndPoints = {
    ASIDE : BaseUrl+"/api/v1/asideTabsData",
    ORGANIZATIONLIST : BaseUrl +"/api/v1/getOrganizations",
    SUBORGANIZATIONLIST :  BaseUrl +"/api/v1/getBranchData",
    ROLELIST : BaseUrl+"/api/v1/getRoleData/",
    SUBORGANIZATIONSBYORGANIZATIONS : BaseUrl+"/api/v1/getBranchesByOrganization",
    UNASSIGNEDSUBORGANIZATIONS : BaseUrl+"/api/v1/getUnassignedBranches"
}

export const Organization_EndPoints = {
    ADD_ORGANIZATION : BaseUrl + "/api/v1/addOrganization",
    EDIT_ORGANIZATION : BaseUrl + "/api/v1/editOrganization",
    DELETE_ORGANIZATION : BaseUrl + "/api/v1/deleteOrganization"
}

export const Sub_Organization_EndPoints = {
    ADD_SUB_ORGANIZATION : BaseUrl+ "/api/v1/addBranch",
    EDIT_SUB_ORGANIZATION : BaseUrl+ "/api/v1/editBranch",
    DELETE_SUB_ORGANIZATION : BaseUrl+ "/api/v1/deleteBranch",
    ASSIGN_ORGANIZATION_TO_SUBORGANIZATION : BaseUrl + "/api/v1/assignOrganization-branch",
    REMOVE_ORGANIZATION_FROM_SUBORGANIZATION : BaseUrl + "/api/v1/unAssignOrganization-branch"
}

export const DepartmentEndPoints ={
    ALLDEPARTMENTS : BaseUrl+"/api/v1/getDepartmentData",
    DEPARTMENTBYORGANIZATION : BaseUrl+"/api/v1/getDepartmentByOrganization",
    UNASSIGNED_DEPARTMENTS : BaseUrl+"/api/v1/getUnassignedDepartment",
    ADD_DEPARTMENT  : BaseUrl+"/api/v1/addDepartment",
    EDIT_DEPARTMENT : BaseUrl + "/api/v1/editDepartment",
    DELETE_DEPARTMENT : BaseUrl + "/api/v1/deleteDepartment",
    ASSIGN_BRANCH_TO_DEPARTMENT : BaseUrl + "/api/v1/assignBranch",
    REMOVE_BRANCH_FROM_DEPARTMENT : BaseUrl + "/api/v1/unAssignBranch",
    ASSIGN_ORGANIZATION_TO_DEPARTMENT : BaseUrl + "/api/v1/assignOrganization",
    REMOVE_ORGANIZATION_FROM_DEPARTMENT : BaseUrl + "/api/v1/unAssignOrganization"
    
}

export const RoleEndPoints = {
    ALLRoles : BaseUrl + "/api/v1/getRoleData",
    ADD_ROLE : BaseUrl + "/api/v1/addRole",
    EDIT_ROLE : BaseUrl + "/api/v1/editRole",
    DELETE_ROLE : BaseUrl + "/api/v1/deleteRole",
}

export const Attribute_EndPoints ={
    GET_CUSTOMATTRIBUTES : BaseUrl+ "/api/v1/getCustomAttributes" ,
    ADD_CUSTOMATTRIBUTES : BaseUrl + "/api/v1/addAttribute",
    EDIT_CUSTOMATTRIBUTES : BaseUrl + "/api/v1/editAttribute" ,
    DELETE_CUSTOMATTRIBUTES : BaseUrl + "/api/v1/deleteAttribute"
}

export const Employee_EndPoints = {
    GET_EMPLOYEES_BY_NAME : BaseUrl + "/api/v1/searchEmployeeByName",
    GET_EMPLOYEES_BY_PDetails : BaseUrl +"/api/v1/getEmployeeDetailsbyPID",
    ADD_EMPLOYEE : BaseUrl + "/api/v1/createEmployee",
    ADD_PERSONAL_DETAILS : BaseUrl + "/api/v1/createProfile",
    ADD_ADDITIONAL_DETAILS : BaseUrl + "/api/v1/createAdditionalDetails",
    EDIT_PERSONAL_DETAILS : BaseUrl + "/api/v1/editProfile",
    EDIT_ADDITIONAL_DETAILS : BaseUrl + "/api/v1/editAdditionalDetails",
    DELETE_EMPLOYEE : BaseUrl + "/api/v1/deleteEmployee",
    ASSIGN_DEPARTMENT_TO_EMPLOYEE : BaseUrl + "/api/v1/assignDepartment",
    REMOVE_EMPLOYEE_FROM_DEPARTMENT : BaseUrl + "/api/v1/unAssignDepartment"

}

export const Access_EndPoints = {
    GET_FULL_ACCESS_LIST : BaseUrl + "/api/v1/fullAccessList"
}

export const Attendence_EndPoints = {
    GET_ATTENDENCE : BaseUrl + "/api/v1/getAttendenceData",
    ADD_LOCATION : BaseUrl + "/api/v1/addLocation",
    UPDATE_LOCATION : BaseUrl + "/api/v1/editLoaction",
    DELETE_LOCATION : BaseUrl + "/api/v1/deleteLocation",
    ADD_TIMING : BaseUrl + "/api/v1/addTiming",
    UPDATE_TIMING : BaseUrl + "/api/v1/editTiming",
    DELETE_TIMING : BaseUrl + "/api/v1/deleteTiming",
}

export const skill_EndPoints = {
    
    GET_ALL_SKILLS : BaseUrl +"/api/v1/getAllSkills", 
    ADD_SKILLS : BaseUrl + "/api/v1/addSkill",
    UPDATE_SKILL : BaseUrl + "/api/v1/editSkill",
    DELETE_SKILL : BaseUrl + "/api/v1/deleteSkill"
}