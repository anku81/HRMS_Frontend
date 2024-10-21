import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import asideReducer from "./slices/asideSlice";

export const store = configureStore({
reducer :{
    Auth : authReducer,
    User : userReducer,
    Aside : asideReducer
}
})