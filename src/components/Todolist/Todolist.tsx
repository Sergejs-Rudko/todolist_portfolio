import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./Todolist.module.css"
import {FilterValueType} from "../../App";

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
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim().length > 0) {
            props.addTask(title, props.id)
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    const onEnterPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onTaskTitleChangeHandler}
                       onKeyPress={onEnterPressAddTaskHandler}
                       className={error ? styles.error : ""}/>
                <button onClick={addTask}>+</button>
                {
                    error && <div style={{color: "red"}}>{error}</div>
                }
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? styles.taskIsDone : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
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