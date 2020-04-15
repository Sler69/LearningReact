import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField';

const SubmissionProgress = (props) => {
    const { id, name, percentage, description, index, 
        intervalTimer = 100,
        updatePercentageProcess } = props;
    const [animationValue, setAnimationValue] = useState(0);
    const [newPercentage, setNewPercentage] = useState(0)
    useEffect(() => {
        function increaseProgress(){
            if(animationValue === percentage){
                return;
            }
            setAnimationValue(animationValue + 1)
        }
        if(animationValue === percentage){
            return;
        }
        const timer = setInterval(increaseProgress, intervalTimer)
        return ()=>{
            clearInterval(timer)
        }
    },[animationValue])

    useEffect(() => {
        console.log("PERCENTAGE CHANGED!!")
    },[percentage])

    const changePercentage = (e) => {
        const percentageValue = e.target.value;
        console.log(percentageValue)
        setNewPercentage(percentageValue);
    }

    const updatePercentage = () => {
        updatePercentageProcess(index,parseInt(newPercentage))
    }

    return (
    <Card key={`${id}${index} `}>
        <CardContent>
            <Typography variant="h3">
                {name}  
            </Typography>
            <Typography>
                {description}
            </Typography>
        <TextField id={`${id}`}
        type="number" 
        label="New Percentage"
        onChange={changePercentage} />
        <Button onClick={updatePercentage}>Update Percentage</Button>
        <Typography>
                {percentage}
            </Typography>
        <LinearProgress variant="determinate" value={animationValue} />
        </CardContent>
    </Card>   
    )
}

export default SubmissionProgress;