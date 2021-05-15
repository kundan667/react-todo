import './todo.css'

import { useSelector, useDispatch } from 'react-redux'
import { setAllTodos } from "../../actions/index" 

export default function Todo( props ){

    //console.log("function::", props.changeStatus)

    const todosCopy = useSelector(state => state.todoReducers.todosCopy);
    const dispatch = useDispatch();
    
    function changeStatus( index, todoId, isCompleted ){
        // console.log("todosCopy::",todosCopy);
        // console.log("called: ", [index, todoId, isCompleted]);

        // const temp = JSON.stringify(todosCopy);
        // let copy = JSON.parse(temp);

        // copy[index].todos = [];
        // console.log("copy::",copy);

        // dispatch( setAllTodos(copy) )
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
                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b>...</b></a>
                        <div className="dropdown-menu">
                            {
                                ( !props.completed )
                                ?
                                <span className="dropdown-item" onClick={ () => props.changeStatus(props.user, props.id, props.completed) }>Completed</span>
                                :
                                <span className="dropdown-item" onClick={ () => props.changeStatus(props.user, props.id, props.completed) }>Pending</span>
                            }
                            <span className="dropdown-item" onClick={ () => props.changeStatus(props.user, props.id, 'Delete') }>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}