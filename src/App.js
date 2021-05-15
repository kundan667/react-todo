import './App.css';
import Banner from "./components/banner/Banner"
import Todo from "./components/todo/Todo"

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setAllTodos } from "./actions/index"
import axios from 'axios'

import avatar from './assets/images/avatar.webp'

function App() {
  const [todos, setTodos] = useState([]);
  const [todosCopy, setTodosCopy] = useState([]);

  const dispatch = useDispatch();
  
  //const todos = useSelector( (state) => state.todoReducers.todosCopy );
  //const todosCopy = useSelector( (state) => state.todoReducers.todosCopy );
  const allTodos = async () => {
    await axios.get("https://jsonplaceholder.typicode.com/users")
    .then( users => {
        axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((todos) => {
            users.data.forEach((user) => {
            let data = [];
            todos.data.forEach((todo) => {
                if (user.id === todo.userId) data.push(todo)
            });
            user.todos = [...data];
            })
            setTodos(users.data)
            setTodosCopy(users.data)
            dispatch( setAllTodos(users.data) )
        }) 
    })
  }
  useEffect(() => {
    allTodos()
  },[]);

  // Sorting of TODOs
  // function sortTodos (userId, isCompleted) {
  //   //e.preventDefault()
  //   console.log("sorting: ",[userId, isCompleted]);

  //   let copy = [...todosCopy]
  //   let todoById = [];
  //   copy.find((item) => {
  //     if (item.id === userId) {
  //       todoById = item.todos.filter((item) => {
  //         if (item.userId === userId && item.completed === isCompleted)
  //           return item;
  //         if (item.userId === userId && "All" === isCompleted) return item;
  //       });
  //     }
  //   });
  //   let index = todos.findIndex((item) => item.id === userId);
  //   todos[index].todos = todoById;
  //   setTodos(todos)
  //   console.log('todos:',todos);
  // };

  function changeStatus() {
    console.log("change status")
  }

  function sortTodos (userId, index, isCompleted) {
    const temp = JSON.stringify(todosCopy);
    let copy = JSON.parse(temp);

    let userTodoS = JSON.stringify(todos);
    let userTodo = JSON.parse(userTodoS);

    let todoById = copy[index].todos.filter( (item) => {
      if( isCompleted === 'All' ) return item
      else if( item.completed === isCompleted ) return item
    })
    userTodo[index].todos = [...todoById];
    setTodos( userTodo )
  };

  function changeStatus(a,b,c){
    console.log("clicked",[a,b,c]);
  }

  function renderTodos ( userTodos ,index ){
    //const [status, setStatus] = useState([]);
    return (
      <div>
        {
          userTodos.map( todo => {
            return(
              <div className="mr-2 mb-2 ml-2" key={todo.id}>
                <Todo 
                todo={ todo.title } 
                user={ index }
                id={ todo.id }
                completed={ todo.completed }
                changeStatus={ () => changeStatus( index, todo.id, todo.completed ) }/>
              </div>
            )
          })
        }
      </div>
    )
  }

  function renderUser (){
    //console.log("renderUser::", todos)
    let users = todos.map( ( user, index ) => {
      //console.log("user::",user);
      return (
        <div className="card-list" key={ user.id }>
          <div className="user-header d-flex align-items-center justify-content-between px-3 py-2 scroll-bar">
            <div className="user-image rounded-circle overflow-hidden">
              <img src={ avatar } alt="profile" className="w-100"/>
            </div>

            <div>
              <div className="text-muted footer-font">{ user.name }</div>
              <div className="text-muted footer-font">{ user.email }</div>
            </div>

            <div>
              <b
                className="text-primary main-card-sort cursor-pointer"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >...
                </b>
              <div className="dropdown-menu">
                <span
                  className="dropdown-item"
                  onClick={ () => sortTodos(user.id, index, true) } >Completed
                </span>
                <span
                  className="dropdown-item"
                  onClick={ () => sortTodos(user.id, index, false) } >Pending
                </span>
                <span
                  className="dropdown-item"
                  onClick={ () => sortTodos(user.id, index, 'All') }>All
                </span>
              </div>
            </div>
          </div>

          <div className="todo-list-box w-100 scroll-bar" id={user.id}>
            { renderTodos( user.todos, index ) }
          </div>
        </div>
      )
    })
    return users
  }
  
  return (
    <div className="App">
      {/* <Banner /> */}
      <div className="cards todo">
        <div className="form-floating col-12 col-md-6">
          <input v-model="user" type="text" className="form-control" id="floatingInput" placeholder="Search by name or e-mail"/>
        </div>
        <div className="card-list-box d-flex scroll-bar">
          { renderUser() }
        </div>
      </div>
    </div>
  );
}

export default App;
