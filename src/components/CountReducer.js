import React, {useReducer} from 'react'

const initialState = 0; //etat initial du state

const reducer = (state, action) => { //initialise le reducer qui va gérer les actions sur notre state
    switch(action) {
        case 'increment':
            return state+1
        case 'decrement':
            return state-1
        case 'réinitialiser':
            return initialState
            default:
                return state
    }
}

function CountReducer ()  {

const [count, dispatch] = useReducer (reducer, initialState)  // Utiliser le hook useReducer pour créer un état et une fonction de distribution 

  return (
    <div>
      <h1>{count} </h1>
      <button className='btn btn-success m-3' onClick={() => dispatch('increment')}>+</button>
      <button className='btn btn-info m-3' onClick={() => dispatch('réinitialiser')}>*</button>
      <button className='btn btn-danger m-3' onClick={() => dispatch('decrement')}>-</button>
      
    </div>
  )
}

export default CountReducer
