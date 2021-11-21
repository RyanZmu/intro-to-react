// import logo from './logo.svg';
// import './App.css';
import React, {useState, useRef, useEffect} from 'react'; //these are 'hooks'
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid' //library for unique id

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
 const [todos, setTodos] =  useState([])
 const todoNameRef = useRef() // have access to input with this

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos)  setTodos(storedTodos)
  }, [])//empty array calls the function once

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos]) //keeps todos on local storage

  function toggleTodos(id) {
    const newTodos = [...todos] //copy of todos make copies dont modify state variables
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (event) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name,complete:false}] //uuid a library for unique keys
    })
    todoNameRef.current.value = null //clears input
  }
  
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    // a fragment
    <> 
    <TodoList todos={todos} toggleTodos={toggleTodos}/>
    <input ref={todoNameRef}type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
  
}

export default App;
