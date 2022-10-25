import {createTodolistTC, fetchTodolistsTC, removeTodolistTC,} from "../todolistReducer/todolistReducer";
import {TaskFromServerType, TaskModelType, todolistAPI} from "../../API/todolistAPI";
import {AppRootStateType} from "../store";
import {setAppStatusAC} from "../appReducer/appReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

/*export type StateType = {
    [key: string]: TaskFromServerType[]
}*/
export type TaskStateType = {
    [key: string]: TaskFromServerType[]
}

let initialState: TaskStateType = {}

// THUNKS_______________________________________________________________________________________________________________
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasksTC", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    try {
        const resp = await todolistAPI.getTasks(todolistId)
        const tasks = resp.data.items
        thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
        //thunkAPI.dispatch(setTasksAC({tasks: resp.data.items, todolistId}))
        return {tasks, todolistId}
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const addTaskTC = createAsyncThunk("tasks/addTaskTC", async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    try {
        const resp = await todolistAPI.createTask(param.todolistId, param.title)
        if (resp.data.resultCode === 0) {
            const task = resp.data.data.item
            //thunkAPI.dispatch(addTaskAC({todolistId: param.todolistId, title: param.title}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            //return {todolistId: param.todolistId, title: param.title}
            return {task}
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})


export const updateTaskTC = createAsyncThunk("tasks/updateTaskTC", async (param: { todolistId: string, taskId: string, task: TaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType

    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        console.warn("task not found in the state WTF ?")
        return thunkAPI.rejectWithValue("task not found in the state")
    }

    const model = {
        title: param.task.title,
        description: param.task.description,
        status: param.task.status,
        priority: param.task.priority,
        startDate: param.task.startDate,
        deadline: param.task.deadline,
    }

    try {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const resp = await todolistAPI.updateTask(param.todolistId, param.taskId, model)
        if (resp.data.resultCode === 0) {
            //thunkAPI.dispatch(updateTaskAC({id: param.taskId, todolistId: param.todolistId, model}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {id: param.taskId, todolistId: param.todolistId, model}
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
    }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTaskTC", async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    try {
        const resp = await todolistAPI.deleteTask(param.todolistId, param.taskId)
        if (resp.data.resultCode === 0) {
            //thunkAPI.dispatch(removeTaskAC({id: param.taskId, todolistId: param.todolistId}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {id: param.taskId, todolistId: param.todolistId}
        }
        if (resp.data.resultCode !== 0) {
            handleServerError(resp.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
    }
})

//SLICE_________________________________________________________________________________________________________________
const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        /*        removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
                    const tasks = state[action.payload.todolistId]
                    const index = tasks.findIndex(t => t.id === action.payload.id)
                    tasks.splice(index, 1)
                    //return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.id)}
                },*/
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolist.id] = [];
            }
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            if (action.payload) {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            }
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistId] = action.payload.tasks
            }
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                // @ts-ignore
                const index = tasks.findIndex(t => t.id === action.payload.id)
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                // @ts-ignore
                const index = tasks.findIndex(t => t.id === action.payload.id)
                tasks.splice(index, 1)
            }
        })
    }
})

export const taskReducer = slice.reducer


