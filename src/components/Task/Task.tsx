import React, {ChangeEvent} from "react";
import styles from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type PropsType = {
    id: string
    todolistId: string
    isDone: boolean
    title: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {
    const removeTaskHandler = () => {
        props.removeTask(props.id, props.todolistId)
    }

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, e.currentTarget.checked, props.todolistId)

    }

    const editTaskTitle = (title: string) => {
        props.editTaskTitle(props.todolistId, props.id, title)
    }

    return (
        <div>
            <li key={props.id} className={props.isDone ? styles.taskIsDone : ""}>
                <input type="checkbox" checked={props.isDone} onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={props.title} onChangeTitle={(title: string) => editTaskTitle(title)}/>
                <button onClick={removeTaskHandler}>X</button>
            </li>
        </div>
    )
})