import React, { useState } from 'react'
import {v4 as uuidv4} from  "uuid";
import AddTodoForm from './AddTodoForm';

const Todo = () => {

    const [warning, setWarning] = useState(false);

    const [todos, setTodos] = useState([
        {id: 1, todo: 'Acheter du lait'},
        {id: 2, todo: 'Acheter du pain'},
        {id: 3, todo: 'Acheter du fromage'},
        {id: 4, todo: 'Ne pas faire mon Kévin'}
    ])

    const [id, setId] = useState(uuidv4());

    const myTodos = todos.map(todo => {
        return ( <li className='list-group-item' key={todo.id}>{todo.todo} </li>
    )
    })

    const addNewTodo = (newTodo) => {
        setTodos([...todos, {
            id: {id},
            todo: newTodo
        }])
    }
        
  
    const warningMesg = warning && <div className='alert alert-danger' role='alert'>Veulliez indiquer un Todo</div>

  return (
    <div>
        <p className="text-center">Hello you</p>
        {warningMesg}
        <h1 className='text-center'>{todos.length} To-Do </h1>
        <ul className='list-group'>
            {myTodos}
        </ul>
        <AddTodoForm addNewTodo={addNewTodo} />
    </div>
  )
}

export default Todo
