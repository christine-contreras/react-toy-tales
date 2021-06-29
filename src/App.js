import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import { isCompositeComponent } from 'react-dom/test-utils';


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

  handleDeleteToy = (removeToy) => {
    const toyID = removeToy.id 

    fetch(`http://localhost:3000/toys/${toyID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const newToys = this.state.toys.filter(toy => toy !== removeToy)

    this.setState({toys: newToys})
  }


  handleLikeToy = (likedToy) => {
    const toyID = likedToy.id 
    const increaseLikes = parseInt(likedToy.likes) + 1

    const likesData = {
      likes: increaseLikes
    }

    const PatchConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(likesData)
    }

    fetch(`http://localhost:3000/toys/${toyID}`, PatchConfig)
    .then(response => response.json())
    .then(json => {
      const toyChange = this.state.toys.map(toy => toy.id === toyID ? json : {...toy})
      this.setState({toys: toyChange})
    })

  }

  fetchToys = () => {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      this.setState({toys: json})
      
    })
  }

  componentDidMount() {
    this.fetchToys()
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
          <ToyContainer toys={this.state.toys} handleDeleteToy={this.handleDeleteToy} handleLikeToy={this.handleLikeToy}/>
            :
          null
        }

        
        
      </>
    );
  }

}

export default App;
