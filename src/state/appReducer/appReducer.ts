import {AppThunk} from "../store";
import {authAPI} from "../../API/todolistAPI";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";
import {setIsLoggedInAC} from "../authReducer/authReducer";

const AppInitialState = {
    appStatus: "idle",
    error: null,
    isInitialised: false
} as AppStateType

export type AppStatusType = "idle" | "loading" | "success" | "failed"
type AppStateType = {
    appStatus: AppStatusType
    error: string | null
    isInitialised: boolean
}

export const appReducer = (state: AppStateType = AppInitialState, action: AppReducersActionTypes) => {
    switch (action.type) {
        case "SET_APP_ERROR": {
            return {...state, error: action.error}
        }
        case "SET_APP_STATUS": {
            return {...state, appStatus: action.appStatus}
        }
        case "SET_APP_INITIALISED": {
            return {...state, isInitialised: action.isInitialised}
        }
        default : {
            return state
        }
    }
}

//ACTIONS_______________________________________________________________________________________________________________
export const setAppErrorAC = (error: string | null) => ({
    type: "SET_APP_ERROR",
    error
}) as const

export const setAppStatusAC = (appStatus: AppStatusType) => ({
    type: "SET_APP_STATUS",
    appStatus
}) as const

export const setAppInitialiseAC = (isInitialised: boolean) => ({
    type: "SET_APP_INITIALISED",
    isInitialised
}) as const

//THUNKS________________________________________________________________________________________________________________
export const initialiseAppTC = (): AppThunk => async dispatch => {
    try {
        const resp = await authAPI.authMe()
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        }
        if (resp.data.resultCode !== 0) {
            dispatch(setAppInitialiseAC(false))
            handleServerError(resp.data, dispatch)
        }
        dispatch(setAppInitialiseAC(true))
    } catch (error) {
        handleNetworkError(error, dispatch)
    }
}
//TYPES_________________________________________________________________________________________________________________
export type AppReducersActionTypes = SetAppErrorActionType | SetAppStatusActionType | SetAppInitialiseAC
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppInitialiseAC = ReturnType<typeof setAppInitialiseAC>