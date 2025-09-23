import {useState, useEffect} from 'react'

function FunctionCount() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState("")

    // useEffect(() => {

    //     setTimeout(() => {
    //       console.log(`Mise à jour du state via useEffect`); 
    //         document.title = `Vous avez cliqué ${count} fois`
    //     }, 3000,[count])
    // })
    useEffect(() => {
      console.log(`Mise à jour du state via useEffect`)
      document.title = `Vous avez cliqué ${count} fois`
    },[count])

  return (
    <div>
        <h1>{count}</h1>
        <input type='text' value={name} onChange={e=>setName(e.target.value)}/>
        <button className='btn btn-primary' onClick={() => setCount(count + 1)}>Ajouter</button>
    </div>
  )
}

export default FunctionCount
