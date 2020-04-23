import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class PokemonInformation extends React.Component { 

    constructor(props) {
        super(props);
    }

    render(){
        const { name, sprites, types, id,weight,order, baseExperience } = this.props;
        console.log(sprites)
        const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
        const arrayOfSprites = generateImg(sprites)
        return (
        <Card>
            <CardContent>
                <Typography variant="h3">
                    {id}
                </Typography>
                <Typography>
                    {cleanName}
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
         {arrayOfSprites.map((element) => {
                return element ? element : null 
            })}
            </CardContent>

        </Card>)
    }
}

function generateImg(sprites) {
    const array = [];
    for (let [key, value] of Object.entries(sprites)) {
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}

export default PokemonInformation