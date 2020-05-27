import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

import Jugador from './CLVComponents/Jugador';

import './App.css'

// yfgm78t37zj6
const App = () => {

  const [deckId, setDeckId] = useState('bus0tbrlni5r');
  const [numberPlayers, setNumberPlayer] = useState(0);
  const [numberOfDecks, setNumberOfDecks] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(undefined);

  useEffect(()=> {
    setTurn(0);
  }, [numberPlayers])


  const handleChangeDeckId = (e) => {
    setDeckId(e.target.value)
  }

  const handleChangeNumberPlayers = (e) => {
    setNumberPlayer(e.target.value)
  }

  const handleChangeNumberDecks = (e) => {
    setNumberOfDecks(e.target.value)
  }


  const createPlayers = () => {
    if(numberPlayers === 0){
      return;
    }
    const numberCards = 9 * numberPlayers;
    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberCards}`)
    .then(res=> {
      console.log(res);
      const { cards, remaining } = res.data;
      setCardsRemaining(remaining);
      if(cards.length !== numberCards){
        alert("OH OH TO FEW CARDS GET ANOTHER DECK");
        return;
      }
      let newPlayers = [];
      for(let i = 0 ; i < numberPlayers; i++){
        const cardsForPlayers = cards.slice(0,9);
        let newPlayer = {
          downCards: [cardsForPlayers[0], cardsForPlayers[1], cardsForPlayers[2]] , 
          upCards:[cardsForPlayers[3], cardsForPlayers[4], cardsForPlayers[5]] , 
          handCards:[cardsForPlayers[6], cardsForPlayers[7], cardsForPlayers[8]] , 
          id: i
        };
        cards.splice(0,9);
        newPlayers.push(newPlayer);
      }
      console.log(newPlayers);
      setPlayers(newPlayers);
    }).catch(err=> {
      console.log(err)
    })
  }


  return( 
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <h1>Chinga al Vecino</h1>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <h2 style={{padding: '0 5px'}}>Id Deck</h2>
        <p>{deckId}</p>
        </div>
      <div style={{padding: '0 5px'}}>
        <h2>Numero de Jugadores   </h2>
        <p>{numberPlayers}</p>
      </div>
      <div>
        <h2 style={{padding: '0 5px'}}>Numero de Mazos   </h2>
        <p>{numberOfDecks}</p>
      </div>
      <div>
        <h2 style={{padding: '0 5px'}}>Cartas para comer   </h2>
        <p>{cardsRemaining}</p>
      </div>
    </div>
    <div id="inputPlayers" style={{ display: 'flex', flexDirection: 'column', width: '60%'}}>
      <TextField 
        id="deckId" 
        label="Id de Mazo" 
        type="text"
        value={deckId}
        onChange={handleChangeDeckId}
      />
      <TextField 
        id="numberPlayers" 
        label="Numero de Jugadores" 
        type="text"
        value={numberPlayers}
        onChange={handleChangeNumberPlayers}
      />
      <TextField 
        id="decks" 
        label="Numero de Mazos" 
        type="number"
        value={numberOfDecks}
        onChange={handleChangeNumberDecks}
      />
    </div>
    <div>
      <Button variant="contained" onClick={createPlayers}>Crear Jugadores</Button>
    </div>
    <div>
      {players.map((element, index)=> {
        const itsTurn = turn === index;
        return <Jugador {...element} itsTurn={itsTurn}/>
      })}
    </div>
  </div>
  )
}
export default App