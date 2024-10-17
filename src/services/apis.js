const BaseUrl = import.meta.env.VITE_BASE_URL;
export const AuthEndpoints = {
    LOGIN : BaseUrl+"/auth/login",
    GETUSERBYID : BaseUrl+"/getUserById"

}

export const AsideBarEndPoints = {
    ASIDE : BaseUrl+"/asideTabsData"
}