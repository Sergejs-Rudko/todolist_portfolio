import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer, TasksActionTypes} from "./taskReducer/taskReducer";
import {TodolistActionTypes, todolistReducer} from "./todolistReducer/todolistReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppReducersActionTypes} from "./appReducer/appReducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>


export type AppActionsType = TasksActionTypes | TodolistActionTypes | AppReducersActionTypes

// @ts-ignore
window.store = store