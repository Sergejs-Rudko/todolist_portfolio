import {TaskFromServerType} from "../../API/todolistAPI";
import {fetchTasksTC, taskReducer, TaskStateType} from "./taskReducer";


/*test(`Empty array(tasks) should be added to object properties`, () => {
/!*
    let startState = {} as TaskStateType

    const fetchedTodolists : Array<TodolistFromServerType> = [
        {title : "First todolist", id : "1", order : 0, addedDate : "random date"},
        {title : "Second todolist", id : "2", order : 0, addedDate : "another date"}
    ]

    const endState = taskReducer(startState,setTodolistsAC(fetchedTodolists))

    let keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])*!/
})*/

/*
test("Array of tasks should be added to correct todolist", ()=>{
   const tasks : TaskFromServerType[] = [
        {
            title: "First todolists 1st task",
            description: "",
            status: 1,
            priority: 1,
            startDate: "",
            deadline: "",
            //model ^^
            id: "1",
            todolistId: "1",
            order: 0,
            addedDate: ""
        },
        {
            title: "First todolists 2nd task",
            description: "",
            status: 1,
            priority: 1,
            startDate: "",
            deadline: "",
            //model ^^
            id: "2",
            todolistId: "1",
            order: 0,
            addedDate: ""
        }
    ]
    let startState : TaskStateType = {}

    let endState = taskReducer(startState,fetchTasksTC.fulfilled({}))

    expect(endState["1"].length).toBe(2)*!/
})*/
