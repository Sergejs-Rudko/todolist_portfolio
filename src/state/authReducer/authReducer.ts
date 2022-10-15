import {AppThunk} from "../store";
import {setAppStatusAC} from "../appReducer/appReducer";
import {authAPI, LoginParamsType} from "../../API/todolistAPI";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";

let auth_initialState = {
    isLoggedIn: false
} as Auth_initialStateType

type Auth_initialStateType = {
    isLoggedIn: boolean
}

export const authReducer = (state: any = auth_initialState, action: AuthReducerActionTypes): Auth_initialStateType => {
    switch (action.type) {
        case "SET_IS_LOGGED_IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default : {
            return state
        }
    }
}

//ACTIONS_______________________________________________________________________________________________________________
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: "SET_IS_LOGGED_IN",
    isLoggedIn
}) as const


//TYPES_________________________________________________________________________________________________________________
export type AuthReducerActionTypes = LoginActionType
type LoginActionType = ReturnType<typeof setIsLoggedInAC>

//THUNKS________________________________________________________________________________________________________________
export const loginTC = (LoginValues: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const resp = await authAPI.login(LoginValues)
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("idle"))
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, dispatch)
        }
    } catch (error) {
        handleNetworkError(error, dispatch)
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const resp = await authAPI.logout()
        if (resp.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("idle"))
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, dispatch)
        }
    } catch (error) {
        handleNetworkError(error, dispatch)
    }
}