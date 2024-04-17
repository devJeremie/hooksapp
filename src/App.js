import './App.css';

//import library 
import Todo from './components/Todo';


//import Component


function App() {
  return (
    <div className="container">
      <h1 className='text-center'>ToDo List </h1>

    <Todo />
   
    <hr />
    </div>
  );
}

export default App;
