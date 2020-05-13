import React, { Component } from "react";
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import PokemonItems from './Components/PokemonItems'

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputItem:"",
      items: [],
      isLoading: false
    };

    this.handleInputItem = this.handleInputItem.bind(this);
    this.getnewItem = this.getnewItem.bind(this);
  }

  handleInputItem(event) {
    console.log(event)
    const { value } = event.target;
    this.setState(() => {
      console.log(value)
      return {
        inputItem: value
      };
    });
  }


  getnewItem() {
    this.setState((prevState) => {
      return {isLoading: true}
    })
    console.log(this.state.inputItem)
    axios.get(`https://pokeapi.co/api/v2/item/${this.state.inputItem}`)
    .then(res => {
        console.log(res)
        const { data } = res;
        const { name, effect_entries, sprites} = data

        console.log(data)

        const newItem = {
          name,
          effect_entries, 
          sprites
        }
        this.setState(prevState => ({
          items: [newItem, ...prevState.items],
          isLoading: false,
          inputItem: ''
        }))
    }).catch((e) => {
      console.log(e);
      this.setState({
        isLoading: false
      })
    })
  }

  
  render() {

    return (
      <div>
        <h1>Pokedex!</h1>
        {this.state.isLoading &&         
        <LinearProgress color="secondary" />}
        <TextField
          id="newItem"
          onChange={this.handleInputItem}
          value={this.state.inputItem}
        >          
        </TextField>
        <Button variant="contained" color="secondary" onClick={this.getnewItem}>
          Add New Item
        </Button>
        {this.state.items.map((element, index) => {
          const {name } = element;
          return <PokemonItems
            key={`${name}`}
            index={index}
            {...element}
          />
        })}
      </div>
    );
  }
}

export default App;
