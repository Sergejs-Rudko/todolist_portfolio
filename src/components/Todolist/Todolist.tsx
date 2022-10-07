import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from "@mui/material";
import {
    FilterValueType,
    removeTodolistTC,
    updateTodolistTC
} from "../../state/todolistReducer";
import {TaskFromServerType, TaskStatuses} from "../../API/todolistAPI";
import {addTaskTC, fetchTasksTC} from "../../state/taskReducer";
import {useAppDispatch} from "../../state/hooks";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskFromServerType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValueType
    editTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    //FUNCTIONS_________________________________________________________________________________________________________
    const removeTodolistHandler = () => {
        dispatch(removeTodolistTC(props.id))
    }

    const addTask = useCallback((title: string) => {
        //props.addTask(title, props.id)
        dispatch(addTaskTC(props.id, title))
    }, [dispatch, props.id])

    const onTodolistTitleChangeHandler = (title: string) => {
        dispatch(updateTodolistTC(props.id, title))
    }
    let tasksForTodolist = props.tasks //.props
    if (props.filter === "Completed") {

        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed) //
    }
    if (props.filter === "Active") {

        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New) // props.
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
                                  status={t.status}
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