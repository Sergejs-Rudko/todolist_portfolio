import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    fetchTodolistsTC,
    FilterValueType,
    TodolistDomainType
} from "./state/todolistReducer/todolistReducer";
import {
    addTaskTC, removeTaskTC,
    TaskStateType, updateTaskTC
} from "./state/taskReducer/taskReducer";
import {TaskStatuses} from "./API/todolistAPI";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./components/Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";

export const TodolistsList = React.memo(() => {

    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch();

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        } else {
            dispatch(fetchTodolistsTC())
        }
    }, [isLoggedIn, dispatch, navigate])

    const changeFilter = useCallback((filterValue: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter: filterValue, id: todolistId}))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC({taskId: id, todolistId}))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        // @ts-ignore
        dispatch(updateTaskTC({taskId: id, todolistId, task: tasks[todolistId].find(t => t.id === id)}))
    }, [dispatch,tasks])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const editTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
        // @ts-ignore
        dispatch(updateTaskTC({taskId: id, todolistId, task: tasks[todolistId].find(t => t.id === id)}))
    }, [dispatch,tasks])

    return (
        <>
            <Grid container style={{paddingBottom: "20px"}}>
                <AddItemForm addItem={(title) => addTodolist(title)}/>
            </Grid>
            <Grid container columnGap={5}>
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={tl.filter}
                                              editTaskTitle={editTaskTitle}
                                              todolistEntityStatus={tl.todolistEntityStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
})