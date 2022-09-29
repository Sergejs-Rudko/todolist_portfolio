import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState<string>(props.title)
    const titleCopy = props.title // Prevents user to fully delete title

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editModeOff = () => {
        if (title.trim().length > 0) {
            props.onChangeTitle(title)
            setEditMode(false)
        } else {
            title = titleCopy
        }
    }

    return (
        editMode
            ?
            <TextField variant="standard" value={title}
                       autoFocus={true}
                       onBlur={editModeOff}
                       onChange={onTitleChangeHandler}/>
            :
            <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
    )
})