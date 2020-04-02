import React, { useRef } from 'react';

import { Counter } from './components';
import { STRINGS } from '../../consts';

import './Counters.scss'

export default function Counters(props) {
  const child_up = useRef();
  const child_down = useRef();
  const onReset = () => {
    child_up.current.onReset();
    child_down.current.onReset();
  }

  return (
    <div className='counters-container'>
      <div className='action-btns'>
        <button className='reset-btn' onClick={onReset}>{STRINGS.RESET}</button>
        <button className='back-btn' onClick={props.onBack}>{STRINGS.BACK}</button>
      </div>
      <div className='counters'>
        <Counter ref={child_up} type='up' props={props} id='up-counter' KEY='1'></Counter>
        <Counter ref={child_down} type='down' props={props} id='down-counter' KEY='2'></Counter>
      </div>
    </div>
  );
}
