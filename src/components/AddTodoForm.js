import React, { useState } from 'react';

const AddTodoForm = ({addNewTodo}) => {

    const [addTodo, setAddTodo] = useState('')
    
    const handleTodo = (e) => {
        e.preventDefault()
        addNewTodo(addTodo);
        setAddTodo("")  
        // e.target.reset() // si jamais dans l'input on a enleve value={addTodo} par contre si on renvoie il renverra le dernier state
    }
    
    return (
    <form className='mt-4' onSubmit={handleTodo}> 
        <div className='card card-body'>
            <div className='form-group'>
                <label>Ajouter Todo</label>
                <input className='form-control' value={addTodo} type="text" onChange={(e) => setAddTodo(e.target.value)}/>
                <input type="submit" className='btn btn-success mt-4' />
            </div>
        </div>
    </form>
    
  )
}

export default AddTodoForm
