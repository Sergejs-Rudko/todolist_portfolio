import React, {ChangeEvent, useCallback} from "react";
import styles from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton} from "@mui/material";

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

    const editTaskTitle = useCallback((title: string) => {
        props.editTaskTitle(props.todolistId, props.id, title)
    }, [props.editTaskTitle, props.todolistId, props.id])

    return (
        <div>
            <div key={props.id} className={props.isDone ? styles.taskIsDone : ""}>
                <Checkbox checked={props.isDone} onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={props.title} onChangeTitle={(title: string) => editTaskTitle(title)}/>
                <IconButton onClick={removeTaskHandler} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})