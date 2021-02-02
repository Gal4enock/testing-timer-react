import React, { useState } from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import Button from '../Button/Button';

import style from './App.module.css';

function App() {

  const [hours, setHours] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [timer, setTimer] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [diff, setDiff] = useState(0)

  let newSec = sec
  let newMin = min;
  let newHours = hours;
  let newDiff = diff;

  function pad(value) {
    return String(value).padStart(2, '0');
  };

  const hendlerStart = () => {
    const timerSubscription = interval(1000)
      .pipe(map((v) => {
        if (v > 0 && v % 60 === 0 || (v - newDiff) === 60) {
          newDiff = v
          setDiff(newDiff);
        };
       return v+1
      }))
        .subscribe((v) => {
          newSec = pad(v - newDiff);
          setSec(newSec);
          if (newSec === '60' && newMin <= 59) {
        newSec = '00'
        setSec('00');
        newMin = pad(Number(newMin) +1)
        setMin(newMin);
      }

          if (newMin === '60' && newHours <= 59) {
        newSec = '00';
        newMin = '00';
        setSec('00');
        setMin('00');
        newHours = pad(Number(newHours) + 1)
        setMin(newHours);
      }
        });
      setTimer(timerSubscription);
    
  }


  const handlerStop = () => {
    timer.unsubscribe()
    newDiff = 0;
    setDiff(0);
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
      timer.unsubscribe()
      newDiff = -newSec
      setDiff(-newSec);
      clearTimeout(timeoutID);
    }
  }

  return (
    <div className={style.App}>
      <header className={style.App_header}>
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
