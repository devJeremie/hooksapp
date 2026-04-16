import React, {useReducer} from 'react'

// L'état initial du compteur — ici un simple nombre, pas un objet
const initialState = 0;

// Le reducer est une fonction pure qui reçoit l'état actuel et une action
// Il retourne TOUJOURS un nouvel état sans jamais modifier le state directement
const reducer = (state, action) => {
    switch(action) {
        case 'increment':
            return state + 1          // on retourne un nouvel état incrémenté de 1
        case 'decrement':
            return state - 1          // on retourne un nouvel état décrémenté de 1
        case 'réinitialiser':
            return initialState       // on remet le compteur à sa valeur de départ (0)
        default:
            return state              // si l'action est inconnue, on retourne l'état sans modification
    }
}

function CountReducer ()  {

  // useReducer retourne deux éléments :
  // - count  : la valeur actuelle du state (remplace useState)
  // - dispatch : la fonction qui envoie une action au reducer pour mettre à jour le state
  const [count, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      {/* Affichage de la valeur actuelle du state */}
      <h1>{count}</h1>

      {/* Chaque bouton appelle dispatch() avec le nom de l'action correspondante */}
      <button className='btn btn-success m-3' onClick={() => dispatch('increment')}>+</button>
      <button className='btn btn-info m-3' onClick={() => dispatch('réinitialiser')}>*</button>
      <button className='btn btn-danger m-3' onClick={() => dispatch('decrement')}>-</button>
    </div>
  )
}

export default CountReducer
