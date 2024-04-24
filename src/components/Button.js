import React from 'react'

function Button({ btnColor, increment, children, handleClick }) {
  return (
    <div>
      <button onClick={() => handleClick(increment)} className={`btn btn-${btnColor}`}>+{increment} %</button>
    </div>
  )
}

export default Button
