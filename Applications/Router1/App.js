import React, { useState } from 'react';
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
  const [value, setValue] = useState(()=>{
    if(location.pathname === '/items'){
      return 2
    }
    if(location.pathname === '/pokemons'){
      return 1
    }
    if(location.pathname === '/'){
      return 0
    }
  });
  const [listPokemons, setListPokemons] = useState([]);
  const [listItems, setListItems] = useState([]);

  const addNewPokemon = (newPokemon)=>{
    setListPokemons([...listPokemons, newPokemon])
  }
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const addNewItem = (newItem)=>{
    setListItems([...listItems, newItem])
  }

  return (   
      <Paper >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        > 
          <Link to='/' onClick={() => {handleChange(0)}} > 
            <Tab label="Home" />
          </Link>
          <Link to='/pokemons' onClick={() => {handleChange(1)}} >  
            <Tab label="Pokemons" />
          </Link>
          <Link to='/items' onClick={() => {handleChange(2)}} >
            <Tab label="Items" />
          </Link>
        </Tabs>

        <Switch>
            <Route path="/items">
              <Items listItems={listItems} addNewItem={addNewItem}/>
            </Route>
            <Route path="/pokemons">
              <Pokemons listPokemons={listPokemons} addNewPokemon={addNewPokemon}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Paper>
  )
}
const AppWithRouter = withRouter(App);

const AppRouter = () => {
  return <Router>
    <AppWithRouter/>
  </Router>
}


export default AppRouter;
