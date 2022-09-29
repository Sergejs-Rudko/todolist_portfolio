import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
import {removeTodolistAC} from "./todolistReducer";

test("Task from correct todolist should be removed", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState = {
        [todolistId1]: [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: false},
            {id: "3", title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "Banana", isDone: true},
            {id: "2", title: "Milk", isDone: false},
            {id: "3", title: "Snickers", isDone: false},
        ]
    }

    const endState = taskReducer(startState, removeTaskAC(todolistId1, "1"))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
})

test("Task should be added to correct todolist", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState = {
        [todolistId1]: [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: false},
            {id: "3", title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "Banana", isDone: true},
            {id: "2", title: "Milk", isDone: false},
            {id: "3", title: "Snickers", isDone: false},
        ]
    }

    const endState = taskReducer(startState, addTaskAC(todolistId1, "Book"))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][3].title).toBe("Book")
    expect(endState[todolistId2].length).toBe(3)
})

test("Change task status", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState = {
        [todolistId1]: [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: false},
            {id: "3", title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "Banana", isDone: true},
            {id: "2", title: "Milk", isDone: false},
            {id: "3", title: "Snickers", isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeTaskStatusAC(todolistId2, "2", true))

    expect(endState[todolistId2][1].isDone).toBeTruthy()
    expect(endState[todolistId1][1].isDone).toBeFalsy()
})

test("Change task title", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState = {
        [todolistId1]: [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: false},
            {id: "3", title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "Banana", isDone: true},
            {id: "2", title: "Milk", isDone: false},
            {id: "3", title: "Snickers", isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC(todolistId1, "3", "React"))

    expect(endState[todolistId1][2].title).toBe("React")
})

test("Removing task arrays when todolist is removed", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState = {
        [todolistId1]: [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: false},
            {id: "3", title: "JS", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "Banana", isDone: true},
            {id: "2", title: "Milk", isDone: false},
            {id: "3", title: "Snickers", isDone: false},
        ]
    }

    const endState = taskReducer(startState, removeTodolistAC(todolistId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(keys[1]).toBeUndefined()
})