import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./AddItemForm.module.css"
import {IconButton, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';


type PropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: PropsType) => {
    //STATE_____________________________________________________________________________________________________________
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    //STATE^____________________________________________________________________________________________________________

    //FUNCTIONS_________________________________________________________________________________________________________
    const addItem = () => {
        if (title.trim().length > 0) {
            props.addItem(title)
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    const onTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onEnterPressAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
            setTitle("")
        }
    }
    //FUNCTIONS^________________________________________________________________________________________________________

    return (
        <div>
            <TextField error={!!error}
                       variant={"standard"} value={title}
                       onChange={onTaskTitleChangeHandler}
                       onKeyPress={onEnterPressAddTaskHandler}
                       helperText={error}/>
            <IconButton onClick={addItem}>
                <ControlPointIcon/>
            </IconButton>
        </div>
    )
})