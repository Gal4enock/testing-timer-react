import React from 'react';

import style from './Timer.module.css';

const Timer = function () {
  return (
    <div className={style.timer}>
      <p className={style.js.clockface}></p>
      <div className={style.action}>
        <button className={style.timer_btn}>Start</button>
        <button className={style.timer_btn}>Stop</button>
        <button className={style.timer_btn}>Wait</button>
        <button className={style.timer_btn}>Reset</button>
      </div>
    </div>
  )
}

export default Timer;