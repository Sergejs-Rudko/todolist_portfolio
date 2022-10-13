import {appReducer, AppStatusType, setAppErrorAC, setAppStatusAC} from "./appReducer";

test("correct app status should be applied to app", () => {
    const startState = {
        appStatus: "loading" as AppStatusType,
        error: "null"
    }

    const endState = appReducer(startState, setAppStatusAC("idle"))

    expect(endState.appStatus).toBe("idle")
})

test("Correct error should be applied to APP", () => {
    const startState = {
        appStatus: "loading" as AppStatusType,
        error: null
    }

    const endState = appReducer(startState, setAppErrorAC("u failed again"))

    expect(endState.error).toBe("u failed again")
    expect(endState.appStatus).toBe("loading")
})

