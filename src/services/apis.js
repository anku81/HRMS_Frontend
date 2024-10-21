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

export const DepartmentEndPoints ={
    ALLDEPARTMENTS : BaseUrl+"/api/v1/getDepartmentData",
    DEPARTMENTBYORGANIZATION : BaseUrl+"/api/v1/getDepartmentByOrganization",
    UNASSIGNED_DEPARTMENTS : BaseUrl+"/api/v1/getUnassignedDepartment"
}

export const RoleEndPoints = {
    ALLRoles : BaseUrl + "/api/v1/getRoleData",
    ADD_ROLE : BaseUrl + "/api/v1/addRole",
    EDIT_ROLE : BaseUrl + "/api/v1/editRole",
    DELETE_ROLE : BaseUrl + "/api/v1/deleteRole",
}