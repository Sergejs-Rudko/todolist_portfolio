import {v1} from "uuid";

import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolistReducer";
import {TaskFromServerType, TaskModelType, TaskPriorities, TaskStatuses, todolistAPI} from "../API/todolistAPI";
import {AppThunk} from "./store";

/*export type StateType = {
    [key: string]: TaskFromServerType[]
}*/
export type TaskStateType = {
    [key: string]: TaskFromServerType[]
}

let initialState: TaskStateType = {}


export const taskReducer = (state: TaskStateType = initialState, action: TasksActionTypes): TaskStateType => {
    switch (action.type) {
        case "SET_TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy

        }
        case "SET_TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "REMOVE_TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.id)}
        }
        case "ADD_TASK": {
            const task: TaskFromServerType = {
                id: v1(),
                title: action.title,
                addedDate: "",
                deadline: "",
                description: "",
                priority: TaskPriorities.Low,
                order: 0,
                status: TaskStatuses.New,
                startDate: "",
                todolistId: action.todolistId
            }
            return {...state, [action.todolistId]: [...state[action.todolistId], task]}
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.id ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case "ADD_TODOLIST": {
            return {...state, [action.todolist.id]: []}
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
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => t.id === action.id ? {
                    ...action.model,
                    id: t.id,
                    todolistId: t.todolistId,
                    order: t.order,
                    addedDate: t.addedDate
                } : t)
            }
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

export const changeTaskStatusAC = (todolistId: string, id: string, status: TaskStatuses) => ({
    type: "CHANGE_TASK_STATUS",
    todolistId,
    id,
    status
}) as const

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: "CHANGE_TASK_TITLE",
    todolistId,
    id,
    title
}) as const

export const setTasksAC = (tasks: TaskFromServerType[], todolistId: string) => ({
    type: "SET_TASKS",
    todolistId,
    tasks
}) as const

export const updateTaskAC = (model: TaskModelType, todolistId: string, id: string) => ({
    type: "UPDATE_TASK",
    todolistId,
    id,
    model
}) as const

// THUNKS_______________________________________________________________________________________________________________
export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.getTasks(todolistId)
    dispatch(setTasksAC(resp.data.items, todolistId))
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.createTask(todolistId, title)
    if (resp.data.resultCode === 0) {
        dispatch(addTaskAC(todolistId, title))
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: TaskModelType): AppThunk => async dispatch => {
    const resp = await todolistAPI.updateTask(todolistId, taskId, model)
    if (resp.data.resultCode === 0) {
        dispatch(updateTaskAC(model, todolistId, taskId))
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    const resp = await todolistAPI.deleteTask(todolistId, taskId)
    if (resp.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, taskId))
    }
}

//ACTION TYPES__________________________________________________________________________________________________________
export type TasksActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | UpdateTaskActionType
    | SetTodolistsActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
