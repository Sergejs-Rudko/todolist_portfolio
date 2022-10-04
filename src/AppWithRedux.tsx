import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTodolistAC, changeTodolistFilterAC, setTodolistsAC} from "./state/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, StateType} from "./state/taskReducer";
import {AppRootStateType} from "./state/store";
import {todolistAPI} from "./API/todolistAPI";

export type FilterValueType = "All" | "Active" | "Completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {
    useEffect(() => {
        todolistAPI.getTodolists().then(
            (res) => (dispatch(setTodolistsAC(res.data)))
        )
    }, [])

    const dispatch = useDispatch();


    const changeFilter = useCallback((filterValue: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filterValue, todolistId))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const editTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch])


    //FUNCTIONS^________________________________________________________________________________________________________

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, StateType >(state => state.tasks)


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


