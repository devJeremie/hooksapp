import React from 'react'
import {UserContext, ColorContext} from './components/MyContext'

const ContentData =() =>{
  return (
    <UserContext.Consumer>
        {
            user => {
                return (
                    <ColorContext.Consumer>
                        { 
                            color => {
                                return (
                                    <div style={{color:color}}>
                                        <ul>
                                            <li>Nom: {user.name}</li>
                                            <li>Age: {user.age}</li>
                                        </ul>
                                    </div>
                                )
                            }
                        }
                    </ColorContext.Consumer>
               )
            }
        }
    </UserContext.Consumer>   
    
  )
}

export default ContentData
