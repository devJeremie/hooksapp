import './App.css';

//import library 
import { v4 as uuidv4 } from 'uuid'; 
import Todo from './components/Todo';

//import Component


function App() {
  return (
    <div className="App">
      <h1 className='text-center'>ToDo List </h1>

    <Todo />
    <hr />
    </div>
  );
}

export default App;
