import React, { useState } from 'react';
import Button from '../Button/Button';

import './App.css';

function App() {

  const [hours, setHours] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [timer, setTimer] = useState('');
  const [waiting, setWaiting] = useState(false);

  let newSec = sec
  let newMin = min;
  let newHours = hours;

  function pad(value) {
  return String(value).padStart(2, '0');
  };

  const hendlerStart = () => {
    setTimer ( setInterval(() => {
     
      if (newSec <= 59) {
        newSec = pad( Number(newSec) + 1)
        setSec(newSec)
      }
      
      if (newSec === '60' && newMin <= 59) {
        newSec = '00'
        newMin = pad(Number(newMin) + 1)
        setMin(newMin);
        setSec('00');
      }

      if (newMin === '60' && newHours <= 59) {
        newSec = '00';
        newMin = '00';
        newHours = pad(Number(newHours) + 1)
        setMin(newHours);
        setSec('00');
        setMin('00');
      }

    }, 100)
    )
  }

  const handlerStop = () => {
    clearInterval(timer);

    setSec('00');
    setHours('00');
    setMin('00');
  }

  const handlerReset = () => {
    handlerStop();
    
    newSec = '00';
    newMin = '00';
    newHours = '00';
  
    hendlerStart()
  }

  const handlerWait = () => {
    setWaiting(true);

    const timeoutID = setTimeout(() => setWaiting(false), 300)

    if (waiting) {
      clearInterval(timer);
      clearTimeout(timeoutID);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {hours} : {min} : {sec}
      </header>
      <main>
        <Button name='Start' onChange={hendlerStart} />
        <Button name='Stop' onChange={handlerStop} />
        <Button name= 'Wait' onChange = {handlerWait} />
        <Button name = 'Reset' onChange ={handlerReset} />
      </main>
    </div>
  );
}

export default App;
