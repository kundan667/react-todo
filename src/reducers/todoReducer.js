const initialData = {
    todos: [],
    todosCopy: []
}

const todoReducers = ( state = initialData, action ) => {
    switch( action.type ){
        
        case "SET_ALL_TODOS":
            return{
                ...state,
                todos: action.payload, todosCopy: action.payload 
            }

        case "SET_TODOS":
            return{
                ...state,
                todos: action.payload
            }

        default: return state
    }
}

export default todoReducers