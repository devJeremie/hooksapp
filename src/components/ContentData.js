import React from 'react'
import {UserContext, ColorContext} from './MyContext'

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
                                            <li className='text-center'>Nom: {user.name}</li>
                                            <li className='text-center'>Age: {user.age}</li>
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
