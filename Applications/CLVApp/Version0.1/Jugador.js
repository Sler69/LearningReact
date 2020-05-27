import React, {useState} from 'react'
import backCard from './backcard.bmp'

const Jugador = ({downCards, upCards, handCards, id, itsTurn }) => {

    const[selectedCards, setSelectedCards] = useState(new Array(handCards.length).fill(false));
    const[firstCardValue, setFirstCardValue] = useState('');
    const selectHandCard = (selectedCardIndex) => {
        if(firstCardValue ){
            const { value } = handCards[selectedCardIndex];
            if(firstCardValue === value){
                const newSelectedCards = selectedCards.map((element,index)=> {
                    if(selectedCardIndex === index ){
                        return !element
                    }
                    return element;
                })

                setSelectedCards(newSelectedCards);
                const deselectedEverything = newSelectedCards.every((element) => element === false);
                console.log(deselectedEverything);
                setFirstCardValue(deselectedEverything ? '' : firstCardValue);
            }
        }else{
            const newSelectedCards = selectedCards.map((element,index)=> {
                if(selectedCardIndex === index ){
                    return !element
                }
                return element;
            });
            setSelectedCards(newSelectedCards);
            const { value } = handCards[selectedCardIndex];
            setFirstCardValue(value);
        }   
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
                    return <img src={element.image}/>
                })}
            </div>
            <div>
                {handCards.map((element, index )=> {
                    const isSelected = selectedCards[index];
                    return (
                    <div onClick={itsTurn ? ()=> {selectHandCard(index)} : undefined} style={{
                        backgroundColor: isSelected ? 'grey': 'white'
                    }}>
                        <img src={element.image}/>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Jugador;