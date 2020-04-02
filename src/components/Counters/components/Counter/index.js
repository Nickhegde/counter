import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { STRINGS } from '../../../../consts';

import './Counter.scss'


const Counter = forwardRef(({ type, props: { duration, interval }, id, KEY }, ref) => {
  const [durationTime, setDurationTime] = useState(type === 'down' ? duration : 0);
  const [time, setTime] = useState([0, 0, 0])
  const [lapHistory, setLaphistory] = useState([]);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (durationTime === duration) setTime(getTime(durationTime));
    const intervalTime = setInterval(() => {
      if (durationTime >= 0 && !(durationTime > duration && type === 'up') && !pause) {
        if (type === 'down') {
          setDurationTime(prevDurationTime => prevDurationTime - 1);
        } else {
          setDurationTime(prevDurationTime => prevDurationTime + 1);
        }
        setTime(getTime(durationTime));
      }
    }, interval);
    return () => clearInterval(intervalTime);
  }, [duration, interval, durationTime, pause, type]);

  useImperativeHandle(ref, () => ({
    onReset() {
      setDurationTime(type === 'down' ? duration : 0);
      setTime(getTime(type === 'down' ? duration : 0));
      setLaphistory([]);
      if (pause) {
        setPause(false);
      }
    }
  }));

  const getTime = (durationT) => {
    let dur = durationT;
    const sec = dur % 60;
    dur = Math.floor(dur / 60);
    const min = dur % 60;
    const hr = Math.floor(dur / 60);
    return [hr, min, sec];
  }

  const setLap = () => {
    const lap = { hr: time[0], min: time[1], sec: time[2] };
    let lapArray = lapHistory;
    if (lapArray.length === 0) {
      const lap = getTime(duration);
      lapArray[0] = type === 'up' ? { hr: 0, min: 0, sec: 0 } : { hr: lap[0], min: lap[1], sec: lap[2] };
    }
    lapArray.push(lap);
    setLaphistory(lapArray);
  }

  const getLaptime = (prev, now) => {
    const prevTotal = (prev.hr * 60 * 60) + (prev.min * 60) + prev.sec;
    const newTotal = (now.hr * 60 * 60) + (now.min * 60) + now.sec;
    let lapTime = getTime(Math.abs(newTotal - prevTotal));
    return `${lapTime[0] ? `${lapTime[0]} hr` : ''} ${lapTime[1] ? `${lapTime[1]}min` : ''} ${lapTime[2]}sec`
  }

  return (
    <div className='up-down-counter-container' id={id} key={KEY}>
      <div className='counter-timer'>
        <span>{time[0] < 10 ? `0${time[0]}` : time[0]}</span>:
        <span>{time[1] < 10 ? `0${time[1]}` : time[1]}</span>:
        <span>{time[2] < 10 ? `0${time[2]}` : time[2]}</span>
      </div>
      <button className='counter-pause-resume' onClick={() => { setPause(!pause) }}>{pause ? STRINGS.RESUME : STRINGS.PAUSE}</button>
      <button className={`counter-lap ${pause ? 'disabled' : ''}`} onClick={pause ? () => { } : setLap}>{STRINGS.LAP}</button>
      <div className='lap-history-container'>
        <div className='lap-history-title'>{STRINGS.LAP_HISTORY}</div>
        <table className='lap-history-table'>
          <thead>
            <tr className='table-headers'>
              <th>{STRINGS.PREVIOUS_STATE}</th>
              <th>{STRINGS.CURRENT_STATE}</th>
              <th>{STRINGS.LAP_TIME}</th>
            </tr>
          </thead>
          <tbody>
            {lapHistory.map((lapData, index) => {
              const prevLapData = lapData;
              const nowLapData = lapHistory[index + 1]
              return (
                nowLapData ?
                  <tr className='table-headers' key={index}>
                    <td>
                      <span>{prevLapData.hr < 10 ? `0${prevLapData.hr}` : prevLapData.hr}</span>:
                   <span>{prevLapData.min < 10 ? `0${prevLapData.min}` : prevLapData.min}</span>:
                    <span>{prevLapData.sec < 10 ? `0${prevLapData.sec}` : prevLapData.sec}</span>
                    </td>
                    <td>
                      <span>{nowLapData.hr < 10 ? `0${nowLapData.hr}` : nowLapData.hr}</span>:
                  <span>{nowLapData.min < 10 ? `0${nowLapData.min}` : nowLapData.min}</span>:
                  <span>{nowLapData.sec < 10 ? `0${nowLapData.sec}` : nowLapData.sec}</span>
                    </td>
                    <td>{getLaptime(prevLapData, nowLapData)}</td>
                  </tr> : null
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
})

export default Counter;