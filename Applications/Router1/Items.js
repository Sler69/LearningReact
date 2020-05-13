import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Items = ({ listItems = [], addNewItem})=> {
    const [inputItem, setInputItem] = useState('');

    const handleInputItem = (event) => {
        const { value } = event.target;
        setInputItem(value);
    }

    const getNewItem = () => {

        axios.get(`https://pokeapi.co/api/v2/item/${inputItem}`)
        .then(res => {
            console.log(res)
            const { data } = res;
            const { name, sprites } = data
            console.log(data);
            const newItem = {
                name,
                sprites
            }
            addNewItem(newItem);
        }).catch((e) => {

        })
      }
    
    
    return (
        <div>
            <h1>Items</h1>
            <TextField
                id="newpokemon"
                onChange={handleInputItem}
                value={inputItem}
            />
            <Button variant="contained" color="secondary" onClick={getNewItem}>
                Add Item
            </Button>
            <h1>All Items</h1>
            {listItems.map((element)=>{
                const { 
                    name,
                    sprites
                } = element;
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
    const array = [];
    for (let [key, value] of Object.entries(sprites)) {
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}


export default Items;