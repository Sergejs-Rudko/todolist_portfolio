import {setAppErrorAC, setAppStatusAC} from "../state/appReducer/appReducer";
import {ResponseType} from "../API/todolistAPI";
import {AppDispatch} from "../state/store";

export const handleServerError = <D>(data: ResponseType<D>, dispatch: any) => {
    if (data.messages.length > 0) {
        dispatch(setAppErrorAC({error : data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error : "Unknown error occurred , contact ur admin"}))
    }
    dispatch(setAppStatusAC({appStatus : "idle"}))
}


export const handleNetworkError = (error: any, dispatch: any) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatusAC({appStatus : "idle"}))
}