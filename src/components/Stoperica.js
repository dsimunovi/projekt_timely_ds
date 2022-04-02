import React, {useState, useEffect} from 'react'
import './Stoperica.css'

const Stoperica = ({mod,vratiPodatke}) => {
    const [vrijeme, postaviVrijeme] = useState(0);
    const [timerOn, postaviTimerOn] = useState(false);

    useEffect(() =>{
        let interval = null;

        if(mod === 1){
            postaviTimerOn(true)
            interval = setInterval(() =>{
                postaviVrijeme((prevtime) => prevtime + 10);
            },10);
        }
        else if(mod === 2){
            vratiPodatke(`${("0"+Math.floor((vrijeme / 60000) % 60)).slice(-2)} : ${("0"+Math.floor((vrijeme / 1000) % 60)).slice(-2)} : ${("0"+((vrijeme / 10) % 100)).slice(-2)}`);
            clearInterval(interval);
            
            postaviVrijeme(0)
        }
    return() => clearInterval(interval);
    },[timerOn,mod]);
    
    
    return (
      <div className='Timers'>
          <div className='naslov'><h2>Vrijeme rada</h2></div>
          <div id="display">
              <span>{("0" + Math.floor((vrijeme / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((vrijeme / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((vrijeme / 10) % 100)).slice(-2)}</span>
          </div>
          {/* <div id = "buttons">
              {!timerOn && vrijeme === 0 && (
                  <button onClick={() => postaviTimerOn(true)}>Start</button>
              )}
              {timerOn && 
              <button onClick={() => postaviTimerOn(false)}>Stop</button>
              }
              {!timerOn && vrijeme > 0 && (
              <button onClick={() => postaviVrijeme(0)}>Reset</button>
              )}
              {!timerOn && vrijeme > 0 && (
              <button onClick={() => postaviTimerOn(true)}>Resume</button>
              )}
          </div> */}
      </div>
  )
}

export default Stoperica