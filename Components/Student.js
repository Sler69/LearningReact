import React from 'react';

const Student = ({ valueStudent, universtity, printStudent, index, newValue = 1 }) => {

return <div>
    <p>{valueStudent} {universtity} {newValue}</p>
    <button onClick={()=> {printStudent(index)}}>Print Student!</button>
</div>
}

export default Student