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
    this.updateAbilities = this.updateAbilities.bind(this);
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
        console.log(res)
        const { data } = res;
        const { name, sprites, abilities ,types, id, weight, order, base_experience, moves } = data
  
        const newPokemon = {
          name,
          sprites,
          types,
          id,
          weight,
          order,
          baseExperience: base_experience,
          abilities,
          abilitiesInfo:[],
          moves: moves.slice(1,5)
        }
        this.setState(prevState => ({
          pokemons: [newPokemon, ...prevState.pokemons],
          isLoading: false,
          inputPokemon: ''
        }))
    }).catch((e) => {
      console.log(e);
      this.setState({
        isLoading: false
      })
    })
  }

  updateAbilities(newAbilities, pokemonIndexToUpdate){
    const updatePokemons = this.state.pokemons.map((element, index) => {
      if(index === pokemonIndexToUpdate){
        return {
          ...element,
          abilitiesInfo: newAbilities
        }
      }
      return element;
    });
    this.setState({
      pokemons: updatePokemons
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
          const { name, id } = element;
          return <PokemonInformation 
            key={`${name}${index}${id}`}
            index={index}
            updateAbilities={this.updateAbilities}
            {...element}
          />
        })}
      </div>
    );
  }
}

export default App;
