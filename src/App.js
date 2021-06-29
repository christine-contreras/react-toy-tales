import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      this.setState({toys: json})
    })
  }

  handleAddToy = (newToy) => {
    const formData = {
      name: newToy.name,
      image: newToy.image,
      likes: 0
    }

    const configObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', configObject)
    .then(response => response.json())
    .then(json => {
      this.setState(previousState => {
        return {
          toys: [...previousState.toys, json]
        }
      })
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleAddToy={this.handleAddToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>

        { this.state.toys.length !== 0
            ?
          <ToyContainer toys={this.state.toys}/>
            :
          null
        }

        
        
      </>
    );
  }

}

export default App;
