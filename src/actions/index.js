export const setAllTodos = ( payload ) => {
    return {
        type: "SET_ALL_TODOS",
        payload: payload
    }
}

export const setTodosState = ( payload ) => {
    return {
        type: "SET_TODOS",
        payload: payload
    }
}