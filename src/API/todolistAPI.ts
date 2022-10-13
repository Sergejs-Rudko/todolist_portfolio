import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {"API-KEY": "a5f66690-236c-4629-95c6-549b706d8556"}
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistFromServerType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistFromServerType }>>("todo-lists", {title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskFromServerType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, task: TaskModelType) {
        return instance.put<ResponseType<{ item: TaskFromServerType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
    }
}

//TYPES_________________________________________________________________________________________________________________

export type TodolistFromServerType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgent,
    Later
}

export type TaskFromServerType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    //model ^^
    id: string
    todolistId: string
    order: number
    addedDate: string
}

export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}

type GetTasksResponseType = {
    items: TaskFromServerType []
    totalCount: number
    error: string
}


export type TaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}





