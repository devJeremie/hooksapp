import React, { Component } from 'react'

export class ClassCount extends Component {

    componentDidMount(){
        console.log('Je suis dans le CDM')
        document.title= `Vous avez cliqué ${this.state.count} fois`; 
    }

    componentDidUpdate(){
        console.log('Je suis dans le CDU')
        document.title= `Vous avez cliqué ${this.state.count} fois`; 
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button className='btn btn-primary' onClick={() => this.setState({count: this.state.count + 1})}>Click</button>
      </div>
    )
  }
}

export default ClassCount
