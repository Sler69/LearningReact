import React from 'react'
import backCard from './backcard.bmp'

const Jugador = ({downCards, upCards, handCards, id }) => {
    console.log({downCards, upCards, handCards, id });
    return (
        <div>
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
                {handCards.map(element => {
                    return <img src={element.image}/>
                })}
            </div>
        </div>
    )
}

export default Jugador;