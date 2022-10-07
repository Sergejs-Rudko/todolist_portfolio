import React, {ChangeEvent, useCallback} from "react";
import styles from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton} from "@mui/material";
import {TaskModelType, TaskPriorities, TaskStatuses} from "../../API/todolistAPI";
import {useAppDispatch} from "../../state/hooks";
import {removeTaskTC, updateTaskTC} from "../../state/taskReducer";

type PropsType = {
    id: string
    todolistId: string
    status: TaskStatuses
    title: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = () => {
        dispatch(removeTaskTC(props.todolistId, props.id))
    }

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const model: TaskModelType = {
            title: props.title,
            status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        }
        dispatch(updateTaskTC(props.todolistId, props.id, model))
    }

    const editTaskTitle = useCallback((title: string) => {
        //props.editTaskTitle(props.todolistId, props.id, title)
        const model: TaskModelType = {
            title: title,
            status: props.status,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        }
        dispatch(updateTaskTC(props.todolistId, props.id, model))
    }, [dispatch, props.todolistId, props.id, props.status])

    return (
        <div>
            <div key={props.id} className={props.status === TaskStatuses.Completed ? styles.taskIsDone : ""}>
                <Checkbox checked={props.status === TaskStatuses.Completed} onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={props.title} onChangeTitle={(title: string) => editTaskTitle(title)}/>
                <IconButton onClick={removeTaskHandler} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})