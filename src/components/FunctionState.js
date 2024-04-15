import React, {useState} from 'react'



const FunctionState = () => {
    const [counter, setCounter] = useState(0)

    const addOne = () => {
        setCounter(counter + 1)
    }
   
  return (
    <div>
      <p>Function State: </p>
      <button onClick={addOne}>State dans la fonction</button>
    </div>
  )
}

export default FunctionState
