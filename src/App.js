import React, { useState } from 'react';

import { Counters } from './components';
import { STRINGS } from './consts';

import logo from './logo.svg';
import './App.scss';

function App() {
  const [duration, setDuration] = useState(0);
  const [durationType, setDurationType] = useState('min');
  const [interval, setInterval] = useState(0);
  const [intervalType, setIntervalType] = useState('sec');
  const [display, setDisplay] = useState(false);

  const onDurationChange = (e) => {
    if (e.target.value > 0) {
      setDuration(e.target.value);
    } else {
      e.target.value = '';
    }
  }

  const onDurationTypeChange = (e) => {
    setDurationType(e.target.value);
  }

  const onIntervalChange = (e) => {
    if (e.target.value > 0) {
      let interval = e.target.value * 1000;
      setInterval(interval);
    } else {
      e.target.value = '';
    }
  }

  const onIntervalTypeChange = (e) => {
    setIntervalType(e.target.value);
  }

  const showCounters = () => {
    if (durationType === STRINGS.HR) {
      setDuration(duration * 60 * 60)
    } else if (durationType === STRINGS.MIN) {
      setDuration(duration * 60)
    }
    if (intervalType === STRINGS.HR) {
      setInterval(interval * 60 * 60)
    } else if (intervalType === STRINGS.MIN) {
      setInterval(interval * 60)
    }
    setDisplay(true);
  }

  const onBack = () => {
    setDisplay(false);
    setDuration(0);
    setDurationType('min');
    setInterval(0);
    setIntervalType('sec');
  }

  return (
    <div className="app">
      <div className='app-container'>
        <div className='header'>
          <img src={logo} className="app-logo" alt="logo" />
          <span className='title'>{STRINGS.HEADING}</span>
        </div>
        {display ?
          <Counters
            duration={duration}
            interval={interval}
            onBack={onBack}
          ></Counters> :
          <div className='counter-container'>
            <div className='duration'>
              <span>{STRINGS.DURATION}</span>
              <span>
                <input className='duration-input' type='number' onChange={onDurationChange}></input>
                <select className='unit-type' value={durationType} onChange={onDurationTypeChange}>
                  <option value={STRINGS.HR}>{STRINGS.HR}</option>
                  <option value={STRINGS.MIN}>{STRINGS.MIN}</option>
                  <option value={STRINGS.SEC}>{STRINGS.SEC}</option>
                </select>
              </span>
            </div>
            <div className='interval'>
              <span>{STRINGS.INTERVAL}</span>
              <span>
                <input className='interval-input' type='number' onChange={onIntervalChange} ></input>
                <select className='unit-type' value={intervalType} onChange={onIntervalTypeChange}>
                  <option value={STRINGS.HR}>{STRINGS.HR}</option>
                  <option value={STRINGS.MIN}>{STRINGS.MIN}</option>
                  <option value={STRINGS.SEC}>{STRINGS.SEC}</option>
                </select>
              </span>
            </div>
            <button className={`start-btn ${duration && interval ? '' : 'disabled'}`} onClick={duration && interval ? showCounters : () => { }}>{STRINGS.START}</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
