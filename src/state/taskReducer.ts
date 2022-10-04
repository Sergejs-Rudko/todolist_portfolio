import {v1} from "uuid";
import {TaskType} from "../components/Todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistReducer";
import {TaskFromServerType} from "../API/todolistAPI";

export type StateType = {
    [key: string]: TaskType[]
}


let initialState: StateType = {}


export const taskReducer = (state: StateType = initialState, action: UnionActionType): StateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.id)}
        }
        case "ADD_TASK": {
            const task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [...state[action.todolistId], task]}
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case "ADD_TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "REMOVE_TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return {...stateCopy,}
        }
        case "SET_TASKS": {
            debugger
            let tasks = action.tasks.map((t) => ({id: t.id, title: t.title, isDone: t.completed} as const))
            console.log("TSKS NOW")
            console.log(JSON.stringify(tasks))
            //@ts-ignore
            return tasks

        }
        default : {
            return state
        }
    }
}

//ACTIONS_______________________________________________________________________________________________________________
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE_TASK",
    todolistId,
    id
}) as const

export const addTaskAC = (todolistId: string, title: string) => ({
    type: "ADD_TASK",
    todolistId,
    title
}) as const

export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => ({
    type: "CHANGE_TASK_STATUS",
    todolistId,
    id,
    isDone
}) as const

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: "CHANGE_TASK_TITLE",
    todolistId,
    id,
    title
}) as const

export const setTasksAC = (tasks: TaskFromServerType[]) => ({
    type: "SET_TASKS",
    tasks
}) as const


//ACTION TYPES__________________________________________________________________________________________________________
type UnionActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>