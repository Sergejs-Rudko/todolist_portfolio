import {todolistAPI, TodolistFromServerType} from "../../API/todolistAPI";
import {AppStatusType, setAppStatusAC} from "../appReducer/appReducer";
import {handleNetworkError, handleServerError} from "../../utils/handleErrors";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValueType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistFromServerType & {
    filter: FilterValueType
    todolistEntityStatus: AppStatusType
}
let initialState: TodolistDomainType[] = []

//ACTIONS_______________________________________________________________________________________________________________
export const changeTodolistTitleAC = (newTitle: string, id: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    newTitle,
    id
}) as const

//THUNKS________________________________________________________________________________________________________________
export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolistsTC", async (undefined, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const resp = await todolistAPI.getTodolists()
        const todolists = resp.data
        //thunkAPI.dispatch(setTodolistsAC({todolists: resp.data}))
        thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
        return {todolists}
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
    }
})

export const removeTodolistTC = createAsyncThunk("todolists/removeTodolistTC", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    thunkAPI.dispatch(setTodolistEntityStatusAC({entityStatus: "loading", id: todolistId}))
    try {
        const resp = await todolistAPI.removeTodolist(todolistId)
        if (resp.data.resultCode === 0) {
            //dispatch(removeTodolistAC({id: todolistId}))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {todolistId}
        } else {
            handleServerError(resp.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const createTodolistTC = createAsyncThunk("todolists/createTodolistTC", async (title: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const resp = await todolistAPI.createTodolist(title)
        if (resp.data.resultCode === 0) {
            const todolist = resp.data.data.item
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {todolist}
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

export const updateTodolistTC = createAsyncThunk("todolists/updateTodolistTC", async (param: { todolistId: string, title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const resp = await todolistAPI.updateTodolist(param.todolistId, param.title)
        if (resp.data.resultCode === 0) {
            //dispatch(changeTodolistTitleAC(title, todolistId))
            thunkAPI.dispatch(setAppStatusAC({appStatus: "idle"}))
            return {todolistId: param.todolistId, title: param.title}
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

//SLICE_________________________________________________________________________________________________________________
const slice = createSlice(({
    name: "todolists",
    initialState: initialState,
    reducers: {
/*        changeTodolistTitleAC(state, action: PayloadAction<{ newTitle: string, id: string }>) {
            return state.map((tl) => tl.id === action.payload.id ? {...tl, title: action.payload.newTitle} : tl)
        },*/
        /*        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
                    return state.filter((tl) => tl.id !== action.payload.id)
                },*/
        /*        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistFromServerType }>) {
                    const todolist: TodolistDomainType = {
                        id: action.payload.todolist.id,
                        title: action.payload.todolist.title,
                        filter: "All",
                        addedDate: action.payload.todolist.addedDate,
                        order: action.payload.todolist.order,
                        todolistEntityStatus: "idle"
                    }
                    return [todolist, ...state]
                },*/
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValueType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistFromServerType[] }>) {
            return action.payload.todolists.map((tl) => ({...tl, filter: "All", todolistEntityStatus: "idle"}))
        },
        setTodolistEntityStatusAC(state, action: PayloadAction<{ entityStatus: AppStatusType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].todolistEntityStatus = action.payload.entityStatus
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            if (action.payload) {
                return action.payload.todolists.map((tl) => ({...tl, filter: "All", todolistEntityStatus: "idle"}))
            }
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            if (action.payload) {
                const todolist: TodolistDomainType = {
                    id: action.payload.todolist.id,
                    title: action.payload.todolist.title,
                    filter: "All",
                    addedDate: action.payload.todolist.addedDate,
                    order: action.payload.todolist.order,
                    todolistEntityStatus: "idle"
                }
                return [todolist, ...state]
            }
        })
        builder.addCase(updateTodolistTC.fulfilled,(state,action)=>{
            if(action.payload){
                // @ts-ignore
                return state.map((tl) => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
            }
        })
    }
}))

export const todolistReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    setTodolistEntityStatusAC
} = slice.actions



