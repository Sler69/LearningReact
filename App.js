import React, {useState} from 'react';
import './App.css';
import Student from './Student'
import PrintCountMax10 from './PrintCountMax10'

const App = () => {

  const [count, setCount] = useState(0);
  const [alumnos, setAlumnos] = useState(["Siegfried", "Diego", "Isain"])
  
  const printCount = () =>{
    console.log(count);
  }

  const increaseCount = () =>{
    setCount(count + 1)
  }

  const decreaseCount = () =>{
    setCount(count -1 )
  }

  const printStudent = (index) =>{
    console.log(alumnos[index])

  }
  const baseObject1 = {
    alumnos,
    count
  }
  const object = {
    ...baseObject1,
    lol: 'QUE ES ESTO',
    whathappens: () => {
      return console.log("OBJECT THIS!")
    }
  }
  console.log(baseObject1)
  console.log(object)
  const addStudent = () => {
    setAlumnos(["Siegfried", "Diego", "Isain", "Arturo"])
  }

    return (
    <div className="App">
      <h1>Curso para entender React</h1>
      <h2>Alumnos:</h2>
    <PrintCountMax10 count={count}></PrintCountMax10>
    <button onClick={decreaseCount}>-</button>
    <button onClick={printCount}>PRINT!</button>
    <button onClick={increaseCount}>+</button>
    <button onClick={addStudent}>Agregar alumno</button>
    {alumnos.map((element, index)=>{
      return <Student 
      valueStudent={element} 
      universtity="UVM"
      printStudent={printStudent}
      newValue={2}
      index={index}></Student>
    })}
    </div>
    )

}



export default App;
