import React from "react";
import {FilterValueType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from "@mui/material";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    editTodolistTitle: (todolistId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    //FUNCTIONS_________________________________________________________________________________________________________
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onTodolistTitleChangeHandler = (title: string) => {
        props.editTodolistTitle(props.id, title)
    }
    //FUNCTIONS^________________________________________________________________________________________________________
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
                    props.tasks.map((t) => {
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