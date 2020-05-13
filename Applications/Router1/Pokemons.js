import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Pokemons = ({ listPokemons, addNewPokemon})=> {
    const [inputPokemon, setInputPokemon] = useState('');

    const handleInputPokemon = (event) => {
        const { value } = event.target;
        setInputPokemon(value);
    }

    const getNewPokemon = () => {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${inputPokemon}`)
        .then(res => {
            console.log(res)
            const { data } = res;
            const { name, sprites, abilities ,types, id, weight, order, base_experience } = data
      
            const newPokemon = {
              name,
              sprites,
              types,
              id,
              weight,
              order,
              baseExperience: base_experience,
              abilities
            }
            addNewPokemon(newPokemon);
        }).catch((e) => {

        })
      }
    
    
    return (
        <div>
            <h1>Add New Pokemon</h1>
            <TextField
                id="newpokemon"
                onChange={handleInputPokemon}
                value={inputPokemon}
            />
            <Button variant="contained" color="secondary" onClick={getNewPokemon}>
                 Add New Pokemon
            </Button>
            <h1>Pokemons</h1>
            {listPokemons.map((element)=>{
                const { 
                    name,
                    sprites,
                    types,
                    id,
                    weight,
                    order,
                    abilities } = element;
                    const generatedSprites = generateImg(sprites);
                return <div>
                    <h2>{name}</h2>
                    {generatedSprites}
                </div>
            })}
        </div>
    )
}

function generateImg(sprites) {
    console.log("LOL")
    const array = [];
    for (let [key, value] of Object.entries(sprites)) {
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}


export default Pokemons;