import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./Todolist.module.css"
import {FilterValueType} from "../../App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
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
            props.addTask(title)
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


    return (
        <div>
            <h3>{props.title}</h3>
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
                            props.removeTask(t.id)
                        }

                        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
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
                        onClick={() => props.changeFilter("All")}>All
                </button>
                <button className={props.filter === "Completed" ? styles.activeFilter : ""}
                        onClick={() => props.changeFilter("Completed")}>Completed
                </button>
                <button className={props.filter === "Active" ? styles.activeFilter : ""}
                        onClick={() => props.changeFilter("Active")}>Active
                </button>
            </div>
        </div>
    )
})