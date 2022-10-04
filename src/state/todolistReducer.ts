import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../AppWithRedux";
import {TodolistFromServerType} from "../API/todolistAPI";

let initialState: TodolistType[] = []

type UnionActionType =
    ChangeTodolistTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export const changeTodolistTitleAC = (newTitle: string, id: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    newTitle,
    id
}) as const

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE_TODOLIST",
    id
}) as const

export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    title,
    id: v1()
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


type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const todolistReducer = (state: TodolistType[] = initialState, action: UnionActionType) => {
    switch (action.type) {
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD_TODOLIST": {
            const todolist: TodolistType = {id: action.id, title: action.title, filter: "All"}
            return [...state, todolist]
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET_TODOLISTS":{
            debugger
            let fixedTodolists = action.todolists.map((tl)=> ({
                title : tl.title,
                id : tl.id,
                filter : "All"
            }as const))
            console.log(JSON.stringify(fixedTodolists))
            return fixedTodolists
        }
        default : {
            return state
        }
    }
}