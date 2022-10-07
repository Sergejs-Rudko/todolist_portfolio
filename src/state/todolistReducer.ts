import {todolistAPI, TodolistFromServerType} from "../API/todolistAPI";
import {AppThunk} from "./store";


export type FilterValueType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistFromServerType & {
    filter: FilterValueType
}
let initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET_TODOLISTS": {
            return action.todolists.map((tl) => ({...tl, filter: "All"}))
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD_TODOLIST": {
            const todolist: TodolistDomainType = {
                id: action.todolist.id,
                title: action.todolist.title,
                filter: "All",
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }
            return [...state, todolist]
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default : {
            return state
        }
    }
}

export type TodolistActionTypes =
    ChangeTodolistTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

//ACTIONS_______________________________________________________________________________________________________________
export const changeTodolistTitleAC = (newTitle: string, id: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    newTitle,
    id
}) as const

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE_TODOLIST",
    id
}) as const

export const addTodolistAC = (todolist : TodolistFromServerType) => ({
    type: "ADD_TODOLIST",
    todolist

}) as const

export const changeTodolistFilterAC = (filter: FilterValueType, id: string) => ({
    type: "CHANGE_TODOLIST_FILTER",
    id,
    filter
}) as const

export const setTodolistsAC = (todolists: TodolistFromServerType[]) => ({
    type: "SET_TODOLISTS",
    todolists
}) as const
// : ThunkAction<void, AppRootStateType, unknown, AppActionsType>
//THUNKS________________________________________________________________________________________________________________

export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    const resp = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC(resp.data))
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.removeTodolist(todolistId)
    if (resp.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId))
    }
}

export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.createTodolist(title)
    if (resp.data.resultCode === 0) {
        dispatch(addTodolistAC(resp.data.data.item))
    }
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.updateTodolist(todolistId, title)
    if (resp.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }
}

//ACTION TYPES__________________________________________________________________________________________________________
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>