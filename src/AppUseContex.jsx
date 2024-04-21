import React, { Component } from 'react'
import Profile from './components/Profile'
import {UserContext, ColorContext} from './components/MyContext'

import './App.css';

class App extends Component {

  state = {
    user: {
      name: 'Lisa',
      age: 8
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <ColorContext.Provider value={'purple'}>
          <Profile />
        </ColorContext.Provider>
      </UserContext.Provider>
      
    );
  }
}

export default App
