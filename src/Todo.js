import React from 'react'
import TodoList from './TodoList'

export default function Todo({todo, toggleTodos}) {
    function handleTodoClick() {
        toggleTodos(todo.id)
    }

    return (
        <div>
            <label>
            <input type='checkbox' checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}        
            </label>
        </div>
    )
}
