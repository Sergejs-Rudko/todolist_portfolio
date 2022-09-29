import {v1} from "uuid";
import {TaskType} from "../components/Todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistReducer";

type StateType = {
    [key: string]: TaskType[]
}
export let todolistId1 = v1()
export let todolistId2 = v1()

let initialState: StateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Banana", isDone: true},
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Snickers", isDone: false},
    ]
}


export const taskReducer = (state: StateType = initialState, action: UnionActionType): StateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.id)}
        }
        case "ADD_TASK": {
            const task: TaskType = {id: "4", title: action.title, isDone: false}
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


//ACTION TYPES__________________________________________________________________________________________________________
type UnionActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>