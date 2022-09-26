import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./AddItemForm.module.css"

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
            <input value={title}
                   onChange={onTaskTitleChangeHandler}
                   onKeyPress={onEnterPressAddTaskHandler}
                   className={error ? styles.error : ""}/>
            <button onClick={addItem}>+</button>
            {
                error && <div style={{color: "red"}}>{error}</div>
            }
        </div>
    )
})