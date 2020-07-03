import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core';
import backCard from '../Images/Cards/gray_back.png'
import { getImageUrl } from '../Util/cardimages'
const Jugador = ({downCards, upCards, handCards, id, itsTurn, dropHandCardsToTable }) => {

    const[selectedCards, setSelectedCards] = useState(new Array(handCards.length).fill(false));
    const[firstCardValue, setFirstCardValue] = useState('');

    useEffect(() => {
        setSelectedCards(new Array(handCards.length).fill(false))
        setFirstCardValue('');
    }, [handCards])

    const selectHandCard = (selectedCardIndex) => {
        const { value } = handCards[selectedCardIndex];
        if(firstCardValue && firstCardValue !== value){
            return;
        }
        const  newSelectedCards = generateSelectedCardsBooleans(selectedCards, selectedCardIndex);
        setSelectedCards(newSelectedCards);
        const deselectedEverything = newSelectedCards.every((element) => element === false);
        setFirstCardValue(deselectedEverything ? '' : value)

    }

    const dropCards = () => {
        const valuesForCardsTodrop = selectedCards.map((element,index) => {
            if(element){
                return handCards[index];
            }
            return;
        }).filter((e)=> e);
        
        dropHandCardsToTable(valuesForCardsTodrop, id);
    } 

    return (
        <div>
            <div>
                {itsTurn && <h3>Is your turn!</h3>}
            </div>
            <div>
                {downCards.map(element => {
                    return <img style={{width: '236px'}} src={backCard}/>
                })}
            </div>
            <div>
                {upCards.map(element => {
                    const  { code } = element; 
                    const urlImage = getImageUrl(code);
                    return <img style={{width: '236px'}} src={urlImage}/>
                })}
            </div>
            <div>
                {handCards.map((element, index )=> {
                    const isSelected = selectedCards[index];
                    const  { code } = element; 
                    const urlImage = getImageUrl(code);
                    return (
                    <div onClick={itsTurn ? ()=> {selectHandCard(index)} : undefined} style={{
                        backgroundColor: isSelected ? 'grey': 'white'
                    }}>
                        <img style={{width: '236px'}} src={urlImage}/>
                    </div>
                    )
                })}
            </div>
            {itsTurn && 
            <div>
                <Button onClick={dropCards}>Drop Cards</Button>
            </div>
            }
        </div>
    )
}

function generateSelectedCardsBooleans(cards,selectedCardIndex){
    return cards.map((element,index) => {
        if(selectedCardIndex === index ){
            return !element
        }
        return element;
    })
}

export default Jugador;