import {setAppStatusAC} from "../appReducer/appReducer";
import {authAPI, LoginParamsType} from "../../API/todolistAPI";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let auth_initialState = {
    isLoggedIn: false
}
//THUNKS________________________________________________________________________________________________________________

export const logoutTC = createAsyncThunk("auth/logoutTC", async (undefined, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    try {
        const resp = await authAPI.logout()
        if (resp.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: false}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {isLoggedIn: false}
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
    }
})

export const loginTC = createAsyncThunk("auth/loginTC", async (LoginValues: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    try {
        const resp = await authAPI.login(LoginValues)
        if (resp.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {isLoggedIn: true}
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({someError: "some error"})
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
        return {isLoggedIn: false}
    }
})

//SLICE_________________________________________________________________________________________________________________
const slice = createSlice({
    name: "auth",
    initialState: auth_initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        })
    }
})

export const authReducer = slice.reducer

export const {setIsLoggedInAC} = slice.actions







