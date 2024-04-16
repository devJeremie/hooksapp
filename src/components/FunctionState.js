import React, {useState} from 'react'

const FunctionState = () => {
    const [counter, setCounter] = useState(0)

    //Fonction addOne sans prendre la state precedent
    // const addOne = () => {
    //     setCounter(counter + 1)
    // }

    // Fonction addOne en prenant la state precedente (utilisation de callback)
    // const addOne = ()  => {
    //   setCounter(prevCounter => prevCounter + 1)
    // }
   
  return (
    <div>
      <p>Function State: {counter} </p>
      {/* <button className="btn btn-primary" onClick={addOne}>State dans la fonction</button> */}
      <button className="btn btn-primary" onClick={ () => setCounter(prevCounter => prevCounter + 1)}>State dans une fonction</button>
    </div>
  )
}

export default FunctionState
