import {setAppErrorAC, setAppStatusAC} from "../state/appReducer/appReducer";
import {ResponseType} from "../API/todolistAPI";
import {AppDispatch} from "../state/store";

export const handleServerError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length > 0) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Unknown error occurred , contact ur admin"))
    }
    dispatch(setAppStatusAC("idle"))
}


export const handleNetworkError = (error: any, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatusAC("idle"))
}