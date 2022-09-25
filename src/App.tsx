import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = "All" | "Active" | "Completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolistTitle, setTodolistTitle] = useState<string>("")


    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Banana", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Snickers", isDone: false},
        ]
    })

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"},
    ])

    //HANDLERS__________________________________________________________________________________________________________
    let onTodolistTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }
    //FUNCTIONS_________________________________________________________________________________________________________
    const removeTodolist = (todolistId: string) => {
        let todolist = todolists.find((tl) => tl.id === todolistId)
        if (todolist) {
            setTodolists(todolists.filter(tl => tl.id !== todolistId))
            delete tasks[todolistId]
        }
    }

    const changeFilter = (filterValue: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
        }
    }

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== id)})
    }

    const addTask = (title: string, todolistId: string) => {
        let task: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], task]})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId].find((t) => t.id === id)
        if (task) {
            setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
        }
    }

    const addTodolist = () => {
        let todolist: TodolistType = {id: v1(), filter: "All", title: todolistTitle}
        setTodolists([...todolists, todolist])
        setTasks({...tasks, [todolist.id]: []})
    }
    //FUNCTIONS*________________________________________________________________________________________________________


    return (
        <div className="App">
            <div>
                <input value={todolistTitle} onChange={onTodolistTitleChangeHandler}/>
                <button onClick={addTodolist}>+</button>
            </div>
            {

                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "Completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }

                    if (tl.filter === "Active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    return (
                        <Todolist key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
