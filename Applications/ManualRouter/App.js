import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Items from './Components/Items'
import Home from './Components/Home'
import Pokemons from './Components/Pokemons'

const App = (props) => {
  const { location } = props;
  const [value, setValue] = useState(0);

  const addNewPokemon = (newPokemon)=>{
    const { componentProps } = components['pokemons'];
    const { listPokemons } = componentProps;
    const information = listPokemons
    const newArray = [...information, newPokemon] 
    
    const newPokemonsObject = Object.assign(components['pokemons'],{
        componentProps:{
        ...componentProps,
        listPokemons: newArray
        }
    });
    setComponents({
        ...components,
        pokemons: newPokemonsObject
    });
  }

  const addNewItem = (newItem)=>{
  }
  
  const [components, setComponents] = useState({
    home: {
        renderFunction: Home,
        componentProps: {

        }
    },
    pokemons: {
        renderFunction: Pokemons,
        componentProps: {
            addNewPokemon,
            listPokemons: []
        }
    },
    items:{
        renderFunction: Items,
        componentProps: {
            addNewItem,
            listItems: []
        }
    }
})  
  const [currentComponet, setCurrentComponent] = useState('home');

  const handleChange = (index, key) => {
    setValue(index);
    setCurrentComponent(key);
  };

  let { renderFunction, componentProps } = components[currentComponet];
  const CurrentComponent = renderFunction;
  return (   
      <Paper >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"

        > 
            <Tab label="Home" onClick={() => { handleChange(0, 'home')}} />

            <Tab label="Pokemons" onClick={() => { handleChange(1, 'pokemons')}}/>

            <Tab label="Items" onClick={() => { handleChange(2, 'items')}}/>

        </Tabs>
        <CurrentComponent {...componentProps} />
      </Paper>
  )
}

export default App;
