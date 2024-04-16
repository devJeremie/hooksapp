import React, { Component } from 'react';


class ClassState extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            counter: 0
        }
    }

    addOne = () => {
        this.setState(prevState => {
            return {
            counter: prevState.counter + 1
            }
        })
    }
    
    render() {
        return (
            <div>
                <p>ClassState : {this.state.counter}</p>
                <button className="btn btn-primary" onClick={this.addOne}>State dans la Class</button>
            </div>
          )
    }
 
}

export default ClassState
