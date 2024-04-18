import './App.css';

//import library 

//import Component
import ClassCount from './components/ClassCount';
import FunctionCount from './components/FunctionCount';



function App() {
  return (
    <div className="container">
      <h1 className='text-center'>ToDo List </h1>

      <ClassCount />
      <FunctionCount />
    
    <hr />
    </div>
  );
}

export default App;
