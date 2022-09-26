import React from "react";
import styles from "./Todolist.module.css"
import {FilterValueType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <AddItemForm addItem={(title) => addTask(title)}/>
            </div>
            <ul>
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
            </ul>
            <div>
                <button className={props.filter === "All" ? styles.activeFilter : ""}
                        onClick={() => props.changeFilter("All", props.id)}>All
                </button>
                <button className={props.filter === "Completed" ? styles.activeFilter : ""}
                        onClick={() => props.changeFilter("Completed", props.id)}>Completed
                </button>
                <button className={props.filter === "Active" ? styles.activeFilter : ""}
                        onClick={() => props.changeFilter("Active", props.id)}>Active
                </button>
            </div>
        </div>
    )
})