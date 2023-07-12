import {configureStore} from '@reduxjs/toolkit'
import auth from "./auth/auth";
import api from "./middleware/api";

export default  configureStore({
    reducer: {auth},
    middleware :[api]
})