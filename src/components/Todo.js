import React, { useState } from 'react'

const Todo = () => {

    const [todos, setTodos] = useState([
        {id: 1, todo: 'Acheter du lait'},
        {id: 2, todo: 'Acheter du pain'},
        {id: 3, todo: 'Acheter du fromage'},
    ])

    const myTodos = todos.map(todo => {
        return ( <li className='list-group-item' key={todo.id}>{todo.todo} </li>
    )
    })

  return (
    <div>
        Hello you
        <h1 className='text-center'>{todos.length} To-Do </h1>
        <ul className='list-group'>
            {myTodos}
        </ul>
    </div>
  )
}

export default Todo
