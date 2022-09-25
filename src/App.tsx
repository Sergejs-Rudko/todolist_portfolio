import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = "All" | "Active" | "Completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("All")
    //FUNCTIONS_________________________________________________________________________________________________________
    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }

    const removeTask = (id: string) => {
        tasks = tasks.filter((t) => t.id !== id)
        setTasks(tasks)
    }

    const addTask = (title: string) => {
        let task: TaskType = {id: v1(), title, isDone: false}
        setTasks([...tasks, task])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let task = tasks.find((t) => t.id === id)
        if (task) {
            let newTasks = tasks.map((t) => t.id !== id ? t : {...t, isDone})
            setTasks(newTasks)
        }
    }
    //FUNCTIONS*________________________________________________________________________________________________________
    let tasksForTodolist = tasks

    if (filter === "Completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === "Active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
