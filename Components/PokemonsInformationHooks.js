import React, { useState, useEffect, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const PokemonInformation = (props) => { 
    const  { abilitiesInfo,name, sprites, id,weight,order, baseExperience } =  props;
    const [showAbilities, setShowAbilities] = useState(false);
    const [showImages, setShowImages] = useState(true);
    
    const memoizedArrayOfSprites = useMemo(() => generateImg(sprites), [sprites]);
    useEffect(()=>{
        //console.log("Component Mounted!!!")
        return () => {
        //console.log("Componet Will unmount")
        }
    },[])

    useEffect(()=>{
        // console.log("Component Updated")   
    })



    const showInfo = async () => {
        const { abilities, updateAbilities,index, abilitiesInfo } = props;
        if(abilitiesInfo.length !== 0){
            return;
        }
        const urlAbilities = abilities.map(ele => {
            return axios({
               url: ele.ability.url,
               method: 'get'
            });
        });
        const result = await axios.all(urlAbilities).then(responses => {
            const information = responses.map(response => {
                const {data} = response;
                return data;
            });
            return information;
        });
        updateAbilities(result, index)
        setShowAbilities(true);
    }

    const toggleShowAbilities = () => {
        setShowAbilities(!showAbilities);
    }

    const toggleShowImages = () => {
        setShowImages(!showImages);
    }

    const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
    const abilitiesClean = abilitiesInfo;
    const mountAbilities = showAbilities && (abilitiesInfo.length > 0)
    return (
    <Card>
        <CardContent>
            <Typography variant="h3">
                {cleanName}
            </Typography>
            <Typography>
                {id}
            </Typography>
            <Typography>
                {weight}
            </Typography>
            <Typography>
                {order}
            </Typography>
            <Typography>
                {baseExperience}
            </Typography>
            <Button variant="contained" color="secondary" onClick={showInfo}>
                Abilities
            </Button>
            <Button  variant="contained" color="primary" onClick={toggleShowAbilities}>
                Show Abilities
            </Button>
            <Button  variant="contained" color="secondary" onClick={toggleShowImages}>
                Show Images
            </Button>
        {showImages && memoizedArrayOfSprites.map((element) => {
            return element ? element : null 
        })}
        {mountAbilities &&             
        abilitiesClean.map((element) => {
            const { id, name, effect_entries } = element;
            return (<Typography key={`${name}${id}`}>
                {id}
                <br></br>
                {name}
                <br></br>
                {effect_entries.map((element) => {
                    const { effect } = element
                    return `${effect}`
                })}
            </Typography>)
        })}
        </CardContent>

    </Card>)
}

function generateImg(sprites) {
    console.log("LOL")
    const array = [];
    for (let [key, value] of Object.entries(sprites)) {
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}

export default PokemonInformation