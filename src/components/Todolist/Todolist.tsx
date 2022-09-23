import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "../../App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    let [title, setTitle] = useState("")

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim().length > 0) {
            props.addTask(title)
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
                <input value={title} onChange={onTaskTitleChangeHandler} onKeyPress={onEnterPressAddTaskHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                    })
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("All")}>All</button>
                <button onClick={() => props.changeFilter("Completed")}>Completed</button>
                <button onClick={() => props.changeFilter("Active")}>Active</button>
            </div>
        </div>
    )
})