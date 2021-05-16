import './todo.css'

import { useSelector, useDispatch } from 'react-redux'
import { setAllTodos } from "../../actions/index" 

export default function Todo( props ){
    const todos = useSelector(state => state.todoReducers.todos);
    const dispatch = useDispatch();

    function setData ( data, uId, tId, type ){
        data.find((item) => {
            if (item.id === uId) {
              if (type === "Delete") {
                let index = item.todos.findIndex((todo) => todo.id === tId);
                item.todos.splice(index, 1);
              } else {
                item.todos.find((todo) => {
                  if (todo.id === tId) todo.completed = !todo.completed;
                })
              }
            }
        })
        return data
    }
    
    // Change the status of individual todo and dispatch it to state
    function changeStatus( uId, tId, type ){
        const temp2 = JSON.stringify(todos);
        let userTodos = JSON.parse(temp2);
        dispatch( setAllTodos(setData( userTodos, uId, tId, type )) )
    }

    return(
        <div className="card task">
            <div className="card-body py-2 px-3">
                <p className="card-text text-left mb-1">{ props.todo }</p>
                <div className="d-flex justify-content-between">
                    {
                        ( props.completed )
                        ? 
                        <div className="text-right status text-success">Completed</div>
                        :
                        <div className="text-right status text-primary">Pending</div>
                    }
                    <div>
                        <span data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="todo-status"><b>...</b></span>
                        <div className="dropdown-menu">
                            {
                                ( !props.completed )
                                ?
                                <span className="dropdown-item" onClick={ () => changeStatus(props.userId, props.todoId, props.completed) }>Completed</span>
                                :
                                <span className="dropdown-item" onClick={ () => changeStatus(props.userId, props.todoId, props.completed) }>Pending</span>
                            }
                            <span className="dropdown-item" onClick={ () => changeStatus(props.userId, props.todoId, 'Delete') }>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}