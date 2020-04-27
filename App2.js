import React, {useState} from 'react';
import SubmissionProgress from './Components/SubmissionProgress'
import Button from '@material-ui/core/Button';
const App = (props) =>{

  const [processes, setProcesses ] = useState([
    {
      id: "process#45234",
      name: "Proceso1",
      percentage: 51,
      description: 'Process number 1 is really important'
    },
    {
      id: 'process#12354',
      name: "Proceso2",
      percentage: 23,
      description: 'Process number 2 is not so important'
    },
    {
      id: 'process#4564',
      name: "Proceso3",
      percentage: 78,
      description: 'Process number 3 you can skip it'
    },
    {
      id: 'process#34562',
      name: "Proceso4",
      percentage: 2,
      description: 'Process number 4 is urgent'
    }
  ])

  const removeProcesses = () => {
    setProcesses([])
  }

  const updatePercentageProcess = (index, percentage) => {
    const updatedProcesses = processes.map((element,currentIndex)=>{
      if(index === currentIndex ){
        return {
          ...element,
          percentage: percentage
        }
      }
      return element;
    })
    setProcesses(updatedProcesses);
  }

  return (
   <div>
     <h1>Welcome to your applications!</h1>
     <h2>These are your processes at the moment</h2>
     {processes.map((element, index) => {
       const { id , name , percentage, description} = element
       return (
        <SubmissionProgress 
          key={`${id}${index}`}
          id={id}
          name={name}
          percentage={percentage}
          description={description}
          index={index}
          intervalTimer={percentage * 10}
          updatePercentageProcess={updatePercentageProcess}
        />
       )
     })}
     <Button
      onClick={removeProcesses}
     >Remove Last Process</Button>
   </div>
   )

}


export default App;
