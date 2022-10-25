import {combineReducers} from "redux";
import {taskReducer} from "./taskReducer/taskReducer";
import {todolistReducer} from "./todolistReducer/todolistReducer";
import thunk from "redux-thunk";
import {appReducer} from "./appReducer/appReducer";
import {authReducer} from "./authReducer/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth : authReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer : rootReducer,
    middleware : getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch//ThunkDispatch<RootState, unknown, AnyAction>;

// @ts-ignore
window.store = store