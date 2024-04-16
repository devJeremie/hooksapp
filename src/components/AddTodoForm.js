import React, { useState } from 'react';

const AddTodoForm = () => {
  return (
    <form className='mt-4'>
        <div className='card card-body'>
            <div className='form-group'>
                <label>Ajouter Todo</label>
                <input type="text" className='form-control' />
                <input type="submit" className='btn btn-success mt-4' />
            </div>
        </div>
    </form>
    
  )
}

export default AddTodoForm
