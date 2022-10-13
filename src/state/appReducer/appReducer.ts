const AppInitialState = {
    appStatus: "idle",
    error: null
} as AppStateType

export type AppStatusType = "idle" | "loading" | "success" | "failed"
type AppStateType = {
    appStatus: AppStatusType
    error: string | null
}

export const appReducer = (state: AppStateType = AppInitialState, action: AppReducersActionTypes) => {
    switch (action.type) {
        case "SET_APP_ERROR": {
            return {...state, error: action.error}
        }
        case "SET_APP_STATUS": {
            return {...state, appStatus: action.appStatus}
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
//TYPES_________________________________________________________________________________________________________________
export type AppReducersActionTypes = SetAppErrorActionType | SetAppStatusActionType
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>