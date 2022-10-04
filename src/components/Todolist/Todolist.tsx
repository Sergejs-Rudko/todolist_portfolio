import React, {useCallback, useEffect} from "react";
import {FilterValueType, TaskStateType} from "../../AppWithRedux";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC} from "../../state/todolistReducer";
import {todolistAPI} from "../../API/todolistAPI";
import {setTasksAC} from "../../state/taskReducer";
import {AppRootStateType} from "../../state/store";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        todolistAPI.getTasks(props.id).then(
            (res)=>setTasksAC(res.data.items)
        )
    },[])
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    //FUNCTIONS_________________________________________________________________________________________________________
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(props.id))
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onTodolistTitleChangeHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(title, props.id))
    }
    let tasksForTodolist = props.tasks //.props
    if (props.filter === "Completed") {

        tasksForTodolist = props.tasks.filter((t) => t.isDone) //
    }
    if (props.filter === "Active") {

        tasksForTodolist = props.tasks.filter((t) => !t.isDone) // props.
    }
    //FUNCTIONS^________________________________________________________________________________________________________
    // @ts-ignore
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={(title) => {
                    onTodolistTitleChangeHandler(title)
                }}/>
                <IconButton onClick={removeTodolistHandler} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={(title) => addTask(title)}/>
            </div>
            <div>
                {
                    tasksForTodolist.map((t) => {
                        return (
                            <Task key={t.id}
                                  id={t.id}
                                  todolistId={props.id}
                                  isDone={t.isDone}
                                  title={t.title}
                                  removeTask={props.removeTask}
                                  changeTaskStatus={props.changeTaskStatus}
                                  editTaskTitle={props.editTaskTitle}
                            />
                        )
                    })
                }
            </div>
            <div>
                <Button onClick={() => props.changeFilter("All", props.id)}
                        variant={props.filter === "All" ? "contained" : "text"}>All
                </Button>
                <Button variant={props.filter === "Completed" ? "contained" : "text"}
                        onClick={() => props.changeFilter("Completed", props.id)}>Completed
                </Button>
                <Button variant={props.filter === "Active" ? "contained" : "text"}
                        onClick={() => props.changeFilter("Active", props.id)}>Active
                </Button>
            </div>
        </div>
    )
})