import './App.css';
import Banner from "./components/banner/Banner"
import Todo from "./components/todo/Todo"

import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setAllTodos, setTodosState } from "./actions/index"
import axios from 'axios'
import avatar from './assets/images/avatar.webp'

function App() {
  const dispatch = useDispatch();
  const todos = useSelector( (state) => state.todoReducers.todos );
  //const todosCopy = useSelector( (state) => state.todoReducers.todosCopy );

  function setTodoData( data ){
    data.forEach((user) => {
      // Set a flag that will be toggled when a user is searched
      user.isVisible = true;
      let data = [];
      user.todos.forEach((todo) => {
        //  Set a flag in todo and toggle when user filters todo list on basis of status
        todo.isVisible = true;
        if (user.id === todo.userId) data.push(todo)
      });
      user.todos = [...data];
    })

    // Dispatch all todos to set in redux state
    dispatch( setAllTodos(data) )
  }

  const allTodos = async () => {

    // Get all todos rom API if TODO state is empty
    if( Object.keys(todos).length === 0 ){
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
            setTodoData( users.data )
          }) 
      })
    } else{
      setTodoData( todos )
    }
  }
  
  useEffect(() => {
    allTodos()
  },[]);

  // Sort TODOS list on todo.isVisible flag 
  function sortTodos (userId, isCompleted) {
    const temp = JSON.stringify(todos);
    let userTodos = JSON.parse(temp);
    userTodos.find( user => {
      if (user.id === userId) {
        user.todos.filter((item) => {
          if (item.userId === userId && "All" === isCompleted) {
            item.isVisible = true
            return item;
          }
          else if (item.userId === userId ) {
            if(item.completed === isCompleted){
              item.isVisible = true
              return item;
            }else{
              item.isVisible = false
              return item;
            }
          }
        })
      }
    })
    // Dispatch to state
    dispatch(setTodosState(userTodos));
  };

  //Scroll todo list to bottom to view new add todo textarea
  function scrollCardsToBottom( scrollId, textareaId ){
    let todoBox = document.getElementById(scrollId);
      setTimeout( () => {
         todoBox.scrollTop = todoBox.scrollHeight;
         document.getElementById(textareaId).focus();
      }, 500)
  }

  function setData ( data, id ){
    data.find( item  => {
      if (item.id === id) {
        let todoId = 0
        item.todos.forEach( todo => {
          if( todo.id > todoId ) todoId = todo.id;
        })
        let todoObj = {
          userId: id,
          id: todoId + 1,
          title: document.getElementById(id).value,
          completed: false,
          isVisible: true
        }
        item.todos.push( todoObj );
      }
    })
    return data
  }

  // Save todo to state
  function saveTodo( id ){
    if( document.getElementById(id).value.length === 0 ) return

      let userTodoS = JSON.stringify(todos);
      let userTodo = JSON.parse(userTodoS);

      dispatch( setAllTodos( setData(userTodo, id) ) )
      document.getElementById(id).value = '';
  }

  // Fiter on basis of string entered in search input
  function filterUser( inputData ){
    let val = inputData.toLowerCase();
    const temp = JSON.stringify(todos);
    let copy = JSON.parse(temp);

    let todoByName = copy.filter((item) => {
      if ( item.name.toLowerCase().search(val) !== -1 || item.email.toLowerCase().search(val) !== -1 ) {
        item.isVisible = true
        return item;
      }else{
        item.isVisible = false
        return item;
      }
    })

    // Set to redux state
    dispatch( setAllTodos( todoByName ) )
  }

  // Render TODO func
  function renderTodos ( userTodos ,userId ){
    return (
      <div>
        {
          userTodos.map( (todo, todoIndex) => {
            return(
              <div className="mr-2 mb-2 ml-2" key={todo.id}>
                {
                  todo.isVisible 
                  ?
                  <Todo 
                  todo={ todo.title } 
                  userId={ userId }
                  todoId={ todo.id }
                  completed={ todo.completed }/>
                  :
                  '' 
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  // Render User func
  function renderUser (){
    let users = todos.map( ( user, index ) => {

      if(user.isVisible){
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
                    onClick={ () => sortTodos(user.id, true) } >Completed
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={ () => sortTodos(user.id, false) } >Pending
                  </span>
                  <span
                    className="dropdown-item"
                    onClick={ () => sortTodos(user.id, 'All') }>All
                  </span>
                </div>
              </div>
            </div>
  
            <div className="todo-list-box w-100 scroll-bar" id={'todo-box-'+user.id}>
              { renderTodos( user.todos, user.id ) }
              <div className={`mr-2 ml-2 collapse collapseTextarea-${user.id}`}>
                <textarea className="w-100 textarea px-3 py-2" rows="2" id={user.id}></textarea>
              </div>
            </div>
  
            <div className="add-todo text-muted cursor-pointer text-primary"
              data-toggle="collapse" data-target={`.collapseTextarea-${user.id}`} aria-expanded="false" aria-controls="collapseExample">
              <div className={`show collapseTextarea-${user.id}`} onClick={ () => scrollCardsToBottom( `todo-box-${user.id}`, user.id ) }>
                <div className="text-center">+ Add another task</div>
              </div>
              <div className={`collapse pl-2 pr-3 pt-1 collapseTextarea-${user.id}`}>
                <div className="d-flex justify-content-between">
                  <div>
                    <button type="button" className="btn btn-success btn-sm mr-2" onClick={ () => saveTodo( user.id ) }>Add Todo</button>
                    <span className="d-inline-block pl-2">X</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
    return users
  }
  
  return (
    <div className="App">
      <Banner />
      <div className="cards todo">
        <div className="form-floating col-12 col-md-6">
          <input onChange={ (event) => filterUser(event.target.value) } type="text" className="form-control" id="floatingInput" placeholder="Search by name or e-mail"/>
        </div>
        <div className="card-list-box d-flex scroll-bar">
          { renderUser() }
        </div>
      </div>
    </div>
  )
}
export default App;
