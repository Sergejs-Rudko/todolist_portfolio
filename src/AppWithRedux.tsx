import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {AppRootStateType} from "./state/store";

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

    const dispatch = useDispatch();

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }


    const changeFilter = (filterValue: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filterValue, todolistId))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const editTaskTitle = (todolistId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    const editTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }
    //FUNCTIONS^________________________________________________________________________________________________________

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

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
                            if (tl.filter === "Completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                            }

                            if (tl.filter === "Active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                            }
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
                                                  removeTodolist={removeTodolist}
                                                  editTaskTitle={editTaskTitle}
                                                  editTodolistTitle={editTodolistTitle}
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


