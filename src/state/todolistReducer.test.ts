import {setTodolistsAC, TodolistDomainType, todolistReducer} from "./todolistReducer";
import {TodolistFromServerType} from "../API/todolistAPI";


test(`Todolist with filter property "All" should be added to the state`, () => {
    const startState = [] as Array<TodolistDomainType>

    const fetchedTodolists : Array<TodolistFromServerType> = [
        {title : "First todolist", id : "1", order : 0, addedDate : "random date"},
        {title : "Second todolist", id : "2", order : 0, addedDate : "another date"}
    ]

    const endState = todolistReducer(startState,setTodolistsAC(fetchedTodolists))

    expect(endState[0].id).toBe("1")
    expect(endState[1].title).toBe("Second todolist")
    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe("All")
})