import React, { useState, useEffect, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const PokemoItems = (props) => {
    const {name, effect_entries, sprites} = props;
    const memoizedArrayOfSprites = useMemo(() => generateImg(sprites), [sprites]);

console.log(props)

    return(
       <Card>
           <CardContent>
           <Typography variant="h3">
                {name}
            </Typography>
           {effect_entries.map((element)=>{
               const { effect } = element
               return `${effect}`
            })}
            {memoizedArrayOfSprites.map((element) => {
                return element ? element : null 
            })}
        </CardContent>
       </Card> 
    )

}

function generateImg(sprites) {
    
    if(!sprites){
        return []
    }
    console.log("LOL")
    const array = [];

    for (let [key, value] of Object.entries(sprites)) {
        
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}
export default PokemoItems