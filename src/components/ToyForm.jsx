import React, { Component } from 'react';

class ToyForm extends Component {
    state = {
      name: "",
      image: ""
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if(this.state.name !== "" && this.state.image !== ""){
      this.props.handleAddToy(this.state)
    }

  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." value={this.state.name} onChange={this.handleChange} className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." value={this.state.image} onChange={this.handleChange} className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
