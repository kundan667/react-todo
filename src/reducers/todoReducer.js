const initialData = {
    todos: [],
    todosCopy: []
}

const todoReducers = ( state = initialData, action ) => {
    switch( action.type ){
        
        case "SET_ALL_TODOS":
            console.log("action::", action.payload);
            return{
                ...state,
                todos: action.payload, todosCopy: action.payload 
            }

        case "SET_TODOS":
            return{
                ...state,
                todos: action.payload 
            }

        case "SET_TODOS_COPY":
            return{
                ...state,
                todosCopy: action.payload 
            }

        default: return state
    }
}

export default todoReducers