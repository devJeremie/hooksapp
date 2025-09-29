import React, { Component, useState } from 'react'
// import Profile from './components/Profile'
import {UserContext, ColorContext} from './components/MyContext'
import { v4 as uuidv4 } from 'uuid'; 

import './App.css';
import Count from './components/Count';
import Button from './components/Button';
//import du router
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import des pages
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
//import de la protection de routes
import PrivateRoute from './components/PrivateRoute';

// import CountReducer from './components/CountReducer';
// import ClassState from './components/ClassState';
// import FunctionState from './components/FunctionState';
// import Todo from './components/Todo';
// import FunctionCount from './components/FunctionCount';
// import ClassCount from './components/ClassCount';

// import TestUseEffect from './components/TestUseEffect';

function App() {

  const [isAdmin, setIsAdmin] = useState(false); // ou false pour non-admin

  const [countOne, setCountOne] = useState({value: 0, btnColor :'success',increment: 25 })
  const [countTwo, setCountTwo] = useState({value: 0, btnColor :'danger',increment: 20 })

  const incrementCountOne = (val) => {
    countOne.value < 100 && setCountOne({...countOne,value: countOne.value + val })
  }
  const incrementCountTwo = (val) => {
    countTwo.value < 100 && setCountTwo({...countTwo,value: countTwo.value + val })
  }
  const [user, setUser] = useState({
    name: 'Lisa',
    age: 8,
  });

    return (
      <Router>

        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute isAdmin={isAdmin}>
                <Profile user={user} />
              </PrivateRoute>
            } />
        </Routes>
      </Router> 
  // <div className='text-center'>
  //        <h1 className='text-center'> Les Hooks</h1>
  //        {/* <ClassState />
  //     //   <FunctionState /> */}
  //       {/* <Todo /> */}
        
  //         {/* <ClassCount />  */}
  //        {/* <FunctionCount /> */}
  //        {/* <TestUseEffect /> */}
  //       {/* <CountReducer /> */}
  //       <Count text='CountOne' count={countOne.value} bgColor={countOne.btnColor} />
  //       <Count text='CountTwo'count={countTwo.value} bgColor={countTwo.btnColor}/>
  //       <Button handleClick={incrementCountOne} btnColor={countOne.btnColor} increment={countOne.increment}>Count 1</Button>
  //       <Button handleClick={incrementCountTwo} btnColor={countTwo.btnColor} increment={countTwo.increment}>Count 2</Button> 
  // </div>
  //     // <UserContext.Provider value={user}>
  //     //   <ColorContext.Provider value={'purple'}>
  //     //     <Profile />
  //     //   </ColorContext.Provider>
  //     // </UserContext.Provider>
      
    )
  }

export default App
