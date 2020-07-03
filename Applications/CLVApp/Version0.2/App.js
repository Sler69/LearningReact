import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

import Jugador from './CLVComponents/Jugador';

import './App.css'

const App = () => {

  const [deckId, setDeckId] = useState('nmig393mf91c');
  const [numberPlayers, setNumberPlayer] = useState(0);
  const [numberOfDecks, setNumberOfDecks] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(undefined);
  const [tableCards, setTableCards] = useState([]);

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

  const dropHandCardsToTable = (cardsToDrop, idUser) => {
    if(tableCards.length === 0 ){
      setTableCards([...cardsToDrop]);
      removeCards(cardsToDrop, idUser);
      
      setTurn(getNextTurn());
      return;
    }

    const firstCard = cardsToDrop[0];
    const lastCardTable = tableCards[0];

    const { value: valueFirstCard = '' } = firstCard;
    const { value: valueSecondCard = '' } = lastCardTable;
    const cardRuleFunction = cardCombinationRules[valueSecondCard];
    const dropCardFunctionObject =  cardRuleFunction(valueFirstCard);
    const { canItDrop, resetTableCards } = dropCardFunctionObject;

    if(canItDrop){
      removeCards(cardsToDrop,idUser);
      setTurn(getNextTurn());
    }
  }


  const createPlayers = () => {
    if(numberPlayers === 0){
      return;
    }
    const numberCards = 9 * numberPlayers;
    axios.get(`http://127.0.0.1:8000/api/deck/${deckId}/draw/?count=${numberCards}`)
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
        newPlayers.push(newPlayer);
      }
      console.log(newPlayers);
      setPlayers(newPlayers);
    }).catch(err=> {
      console.log(err)
    })
  }

  function getNextTurn(){
    return turn === players.length - 1 ? 0 : turn + 1; 
  }

  function removeCards(cardsToDrop, idUser){
    const currentUser = players.find((element) => {
      return element.id === idUser;
    });
    const { handCards } = currentUser;
    const newHandArray = handCards.filter((element=> {
      return cardsToDrop.some(cardToDrop => {
        return element.code !== cardToDrop.code;
      })
    }));

    const newPlayer = {
      ...currentUser,
      handCards: newHandArray
    }

    setPlayers(players.map((element=>{
      if(element.id === idUser){
        return newPlayer;
      }
      return element;
    })))
    return;
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
        return <Jugador {...element} itsTurn={itsTurn} dropHandCardsToTable={dropHandCardsToTable}/>
      })}
    </div>
  </div>
  )
}

export default App;


const cardCombinationRules = { 
  '2': (cardValue) => {
    return {
      canItDrop: true,
      resetTableCards: false
    };
  },
  '3': (cardValue) => {
    return {
      canItDrop: true,
      resetTableCards: false,
    };
  },  
  '4': (cardValue) => {
    return {
      canItDrop: true,
      resetTableCards: false
    };
  },
  '5': (cardValue) => {
    return {
      canItDrop: cardStringsToInt[cardValue] != 4,
      resetTableCards: false
    };
  },  
  '6': (cardValue) => {
    return{
      canItDrop: [2,3,6,7,8,9,10,11,12,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    };
  },
  '7': (cardValue) => {
    return {
      canItDrop: cardStringsToInt[cardValue] <= 7,
      resetTableCards: false
    }
  },  
  '8': (cardValue) => {
    return {
      canItDrop: [2,3,8,9,10,11,12,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    }
  },
  '9': (cardValue) => {
    return {
      canItDrop: [2,3,9,10,11,12,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    }
  },  
  '10': (cardValue) => {
    return {
      canItDrop: true,
      resetTableCards: true
    };
  },
  'JACK': (cardValue) => {
    return {
      canItDrop: [2,3,10,11,12,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    };
  },  
  'QUEEN': (cardValue) => {
    return {
      canItDrop: [2,3,10,12,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    };
  },
  'KING': (cardValue) => {
    return {
      canItDrop: [2,3,10,13,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    };
  },  
  'ACE': (cardValue) => {
    return {
      canItDrop: [2,3,10,14].includes(cardStringsToInt[cardValue]),
      resetTableCards: false
    };
  },
}

const cardStringsToInt = { 
  '2': 2,
  '3': 3,  
  '4': 4,
  '5': 5,  
  '6': 6,
  '7': 7,  
  '8': 8,
  '9': 9,  
  '10': 10,
  'JACK': 11,  
  'QUEEN': 12,
  'KING': 13,  
  'ACE': 14,
}