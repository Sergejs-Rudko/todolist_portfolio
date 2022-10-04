import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolistReducer";
import {TodolistType} from "../AppWithRedux";

test("Change todolist title", () => {
    const startState: TodolistType[] = [
        {id: "1", title: "What to learn", filter: "All"},
        {id: "2", title: "What to buy", filter: "All"},
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC("What ive learned", "1"))

    expect(endState[0].title).toBe("What ive learned")
})

test("Remove correct todolist", () => {
    const startState: TodolistType[] = [
        {id: "1", title: "What to learn", filter: "All"},
        {id: "2", title: "What to buy", filter: "All"},
    ]

    const endState = todolistReducer(startState, removeTodolistAC("1"))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("2")
})

test("Adding new todolist", () => {
    const startState: TodolistType[] = [
        {id: "1", title: "What to learn", filter: "All"},
        {id: "2", title: "What to buy", filter: "All"},
    ]

    const endState = todolistReducer(startState, addTodolistAC("BANANAS"))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("BANANAS")
})

test("Changing todolist filter", () => {
    const startState: TodolistType[] = [
        {id: "1", title: "What to learn", filter: "All"},
        {id: "2", title: "What to buy", filter: "All"},
    ]

    const endState = todolistReducer(startState, changeTodolistFilterAC("Completed", "1"))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("Completed")
})