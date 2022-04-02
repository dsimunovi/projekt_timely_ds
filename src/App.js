import React, {useState} from 'react'
import './App.css';
import Tipka from './components/Tipka'
import TablicaProjekata from './components/TablicaProjekata';
import Stoperica from './components/Stoperica';
import ModalniProzor from './components/ModalniProzor';
import Opcije from './components/Opcije';

function App() {
  const [ tipkaStartStop, postaviTipkuStartStop] = useState(false)
  const [ modal, postaviModal] = useState(false)
  const [ projekti, postaviProjekte] = useState([])
  const [ modStoperica, postaviModStoperica] = useState(0)
  const [ vrijemeStart, postaviVrijemeStart] = useState('')
  const [ vrijemeStop, postaviVrijemeStop] = useState('')
  const [ interval, postaviInterval] = useState(0);
  

  function toggleModalOn() {  
    postaviModal(true);
  }


  function toggleModalOff(unos) {  
    const noviObjekt = {
      nazivP: unos,
      startP: vrijemeStart,
      stopP: vrijemeStop,
      trajanjeP: interval,
    }

      postaviProjekte(projekti.concat(noviObjekt))
      
      postaviModal(false);
  }

  const spremiPod = (vrijeme) =>{
    postaviInterval(vrijeme)

    postaviModStoperica(0)
    toggleModalOn()
    }

  const promjenaVidljivostiStart = () => { 
    postaviTipkuStartStop(false)
    postaviModStoperica(2)
    let datum = new Date();
    postaviVrijemeStop(`${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}. ${datum.getHours()} h ${datum.getMinutes()} min ${datum.getSeconds()} s`)
  }

  const promjenaVidljivostiStop = () => { 
    postaviTipkuStartStop(true)
    postaviModStoperica(1)
    let datum = new Date();
    postaviVrijemeStart(`${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}. ${datum.getHours()} h ${datum.getMinutes()} min ${datum.getSeconds()} s`)
  }

  return (
    <div>
      <div className='conNaslov'><h1>Timely</h1></div>
    <div className='container'>
      <div className='conTablica'>
        {tipkaStartStop ? <Tipka naziv={"Stop"} klik={() => promjenaVidljivostiStart()}/> : <Tipka naziv={"Start"} klik={() => promjenaVidljivostiStop()}/> }
        {tipkaStartStop ? <Stoperica mod={modStoperica} vratiPodatke={spremiPod}/> : <Stoperica mod={modStoperica} vratiPodatke={spremiPod}/>}
      </div>

      {modal ? <ModalniProzor turnModalOff={toggleModalOff} mod={modal} /> : null}

      {projekti.length > 0 ? <TablicaProjekata podatci={projekti}/> : null}
      
    </div>
    </div>
  );
}

export default App;
