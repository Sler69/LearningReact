import React, { Component } from "react";
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import PokemonInformation from './Components/PokemonInformation'

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputPokemon:"",
      pokemons: [],
      isLoading: false
    };

    this.handleInputPokemon = this.handleInputPokemon.bind(this);
    this.getNewPokemon = this.getNewPokemon.bind(this);
    this.arrayValues = []
  }

  handleInputPokemon(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        inputPokemon: value
      };
    });
  }


  getNewPokemon() {
    this.setState((prevState) => {
      return {isLoading: true}
    })
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.inputPokemon}`)
    .then(res => {
      setTimeout(() =>{
        console.log(res)
        const { data } = res;
        const { name, sprites, types, id, weight, order, base_experience } = data
  
        const newPokemon = {
          name,
          sprites,
          types,
          id,
          weight,
          order,
          baseExperience: base_experience
        }
        this.setState(prevState => ({
          pokemons: [newPokemon, ...prevState.pokemons],
          isLoading: false,
          inputPokemon: ''
        }))
       }, 3000)
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
          id="newpokemon"
          onChange={this.handleInputPokemon}
          value={this.state.inputPokemon}
        >
          
        </TextField>
        <Button variant="contained" color="secondary" onClick={this.getNewPokemon}>
          Add New Pokemon
        </Button>
        {this.state.pokemons.map((element, index) => {
          const { name, sprites, id, types, weight,order, baseExperience } = element;
          return <PokemonInformation 
            key={`${name}${index}${id}`}
            name={name}
            sprites={sprites}
            id={id}
            types={types}
            weight={weight}
            order={order}
            baseExperience={baseExperience}
            showTypes
          />
        })}
      </div>
    );
  }
}

export default App;
