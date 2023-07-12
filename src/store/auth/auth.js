import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../config";

const auth = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        data: [],
        status: {}
    },
    reducers: {
        onStart: (state) => {
            state.loading = true
        },
        onSuccess: (state, action) => {
            state.loading = false
        },
        getUser: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        saveUser: (state,action) => {
            state.loading = false
            state.status = action.payload.message
        },
        onFail: (state) => {
            state.loading = false
        }
    }
})

export const getUser = () => apiCall({
    url: '/items',
    method: 'get',
    start: auth.actions.onStart.type,
    onSuccess: auth.actions.getUser.type,
    onFile: auth.actions.onFail.type

})

export const saveUser = (data) => apiCall({
    url: '/items',
    method: 'post',
    data,
    start: auth.actions.onStart.type,
    onSuccess: auth.actions.saveUser.type,
    onFile: auth.actions.onFail.type
})
export default auth.reducer

