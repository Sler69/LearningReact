import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class PokemonInformation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            showAbilities: true
        }
        this.showInfo = this.showInfo.bind(this);
        this.setShowAbilities = this.setShowAbilities.bind(this)
    }

    async showInfo(){
        const { abilities, updateAbilities,index, abilitiesInfo } = this.props;
        if(abilitiesInfo.length !== 0){
            console.log("NO NEED FOR CALL")
            return;
        }
        const urlAbilities = abilities.map(ele => {
            return axios({
               url: ele.ability.url,
               method: 'get'
            });
        });
        console.log("Fetching abilities")
        const result = await axios.all(urlAbilities).then(responses => {
            const information = responses.map(response => {
                const {data} = response;
                return data;
            });
            return information;
        });
        updateAbilities(result, index)

    }

    setShowAbilities(){
        this.setState({
            showAbilities: !this.state.showAbilities
        })
    }


    static getDerivedStateFromProps(props, state){
        console.log(state);
        console.log(props.id, props.weight)

        return null;
    }

    componentWillUnmount(){
        console.log("UNMOUNTING!!!")
    }

    render(){

        const { name, sprites, id,weight,order, baseExperience, abilitiesInfo } = this.props;
        const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
        const arrayOfSprites = generateImg(sprites)
        const abilitiesClean = abilitiesInfo;
        const mountAbilities = this.state.showAbilities && (abilitiesInfo.length > 0)
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
                <Button variant="contained" color="secondary" onClick={this.showInfo}>
                    Abilities
                </Button>
                <Button  variant="contained" color="secondary" onClick={this.setShowAbilities}>
                    Show Abilities
                </Button>
            {arrayOfSprites.map((element) => {
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
}

function generateImg(sprites) {
    const array = [];
    for (let [key, value] of Object.entries(sprites)) {
        array.push ( value ?  <img src={value} /> : undefined)
      }
    return array;
}

export default PokemonInformation