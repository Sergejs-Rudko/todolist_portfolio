import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValueType = "All" | "Active" | "Completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    //STATE_____________________________________________________________________________________________________________
    let [tasks, setTasks] = useState<TaskStateType>({
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
    //STATE^____________________________________________________________________________________________________________


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

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), filter: "All", title}
        setTodolists([...todolists, todolist])
        setTasks({...tasks, [todolist.id]: []})
    }

    const editTaskTitle = (todolistId: string, id: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => t.id === id ? {...t, title: newTitle} : t)
        })
    }

    const editTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(
            todolists.map((tl) => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        )
    }
    //FUNCTIONS^________________________________________________________________________________________________________


    return (
        <div className="App">
            <AddItemForm addItem={(title) => addTodolist(title)}/>
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
                                  editTaskTitle={editTaskTitle}
                                  editTodolistTitle={editTodolistTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
