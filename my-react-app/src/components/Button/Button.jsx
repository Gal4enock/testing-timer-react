import React from 'react';

import style from './Button.module.css';

const Button = function ({name, onChange}) {
  return (
      <button type='button' className={style.timer_btn} onClick={() => onChange()}>{name}</button>
  )
}

export default Button;