import {authAPI} from "../../API/todolistAPI";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";
import {setIsLoggedInAC} from "../authReducer/authReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const AppInitialState: AppStateType = {
    appStatus: "idle",
    error: null,
    isInitialised: false
}

export type AppStatusType = "idle" | "loading" | "success" | "failed"
type AppStateType = {
    appStatus: AppStatusType
    error: string | null
    isInitialised: boolean
}
//THUNKS________________________________________________________________________________________________________________
export const initialiseAppTC = createAsyncThunk("app/initialiseAppTC", async (undefined, thunkAPI) => {
    try {
        const resp = await authAPI.authMe()
        if (resp.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}))
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
    }
})
//SLICE_________________________________________________________________________________________________________________
const slice = createSlice({
    name: "appReducer",
    initialState: AppInitialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ appStatus: AppStatusType }>) {
            state.appStatus = action.payload.appStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initialiseAppTC.fulfilled, (state) => {
            state.isInitialised = true
        })
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC} = slice.actions



