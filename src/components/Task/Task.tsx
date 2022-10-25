import React, {ChangeEvent, useCallback} from "react";
import styles from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton} from "@mui/material";
import {TaskFromServerType, TaskModelType, TaskPriorities, TaskStatuses} from "../../API/todolistAPI";
import {useAppDispatch} from "../../state/hooks";
import {removeTaskTC, updateTaskTC} from "../../state/taskReducer/taskReducer";

type PropsType = {
    id: string
    todolistId: string
    //status: TaskStatuses
    //title: string
    task: TaskFromServerType
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = () => {
        dispatch(removeTaskTC({taskId: props.task.id, todolistId: props.task.todoListId}))
    }

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const model: TaskModelType = {
            title: props.task.title,
            status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        }
        dispatch(updateTaskTC({todolistId: props.task.todoListId, taskId: props.task.id, task : model}))
    }

    const editTaskTitle = useCallback((title: string) => {
        //props.editTaskTitle(props.todolistId, props.id, title)
        debugger
        const model: TaskModelType = {
            title: title,
            status: props.task.status,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        }
        dispatch(updateTaskTC({taskId: props.task.id, todolistId: props.task.todoListId, task : model}))
    }, [dispatch, props.task.todoListId, props.id, props.task.status])

    return (
        <div>
            <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? styles.taskIsDone : ""}>
                <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeTaskStatusHandler}/>
                <EditableSpan title={props.task.title} onChangeTitle={(title: string) => editTaskTitle(title)}/>
                <IconButton onClick={removeTaskHandler} color={"secondary"}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})