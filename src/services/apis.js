const BaseUrl = import.meta.env.VITE_BASE_URL;
export const AuthEndpoints = {
    LOGIN : BaseUrl+"/api/v1/auth/login",
    GETUSERBYID : BaseUrl+"/api/v1/getUserById"

}

export const AsideBarEndPoints = {
    ASIDE : BaseUrl+"/api/v1/asideTabsData",
    ORGANIZATIONLIST : BaseUrl +"/api/v1/getOrganizations",
    SUBORGANIZATIONLIST :  BaseUrl +"/api/v1/getBranchData",
    ROLELIST : BaseUrl+"/api/v1/getRoleData/",
    SUBORGANIZATIONSBYORGANIZATIONS : BaseUrl+"/api/v1/getBranchesByOrganization"
}