import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress'

class ProgressClassicComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            animationValue: 0
        }
        this.interValAnimation = undefined;
        this.increaseAnimationValue = this.increaseAnimationValue.bind(this)
        console.log("Entering Constructors", props.id)
    }

    componentDidMount(){
        this.interValAnimation = setInterval(()=>{
            this.setState((state) => {
                return  { animationValue: state.animationValue + 1 }
              })
        }, 400);
        console.log("Component Did Mount", this.props.id)
    }

    shouldComponentUpdate(){
 
        return this.state.animationValue <=  this.props.percentage
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        return null;
    }

    componentDidUpdate(){
        if(this.state.animationValue >= this.props.percentage){
            clearInterval(this.interValAnimation);
        }
        console.log("Component Did Update",this.props.id);
    }

    componentWillUnmount(){
        clearInterval(this.interValAnimation)
    }

    increaseAnimationValue () {
        this.setState((state) => {
          return  { animationValue: state.animationValue + 1 }
        })
    }



    render(){

        console.log("Render")
        const { id, name, percentage, description, index } = this.props;
        const { animationValue } = this.state;
        console.log(animationValue);
        return (   
        <Card key={`${id}${index} `}>
            <CardContent>
                <Typography variant="h3">
                    {name}  
                </Typography>
                <Typography>
                    {description}
                </Typography>
                <Typography>
                    {percentage}
                </Typography>
                <Typography>
                    {animationValue}
                </Typography>
                <LinearProgress variant="determinate" value={animationValue} />
            </CardContent>
            <Button
                onClick={this.increaseAnimationValue}
            >
                Increase animationValue
            </Button>
        </Card> 
        )  
    }
}

export default ProgressClassicComponent;