import React, {useState, useEffect} from 'react'
import './App.css';
import Tipka from './components/Tipka'
// import TimeTracker from 'react-time-tracker-stopwatch';
import Stopwatch from './components/Stopwatch'
import TablicaProjekata from './components/TablicaProjekata';
import Modal from "react-modal";

function App() {
  const [ formaTimer, postaviFormuTimer] = useState(false)
  const [ tipkaStartStop, postaviTipkuStartStop] = useState(true)
  const [formaModal, postaviFormuModal] = useState(false) 
  const [isOpen, setIsOpen] = useState(false)
  const [ projekti, postaviProjekte] = useState([])
  let vrijemeStart;
  let vrijemeStop;

  function toggleModal() {
    let datum = new Date();
    vrijemeStop = `${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}.  ${datum.getHours}.${datum.getMinutes}.${datum.getSeconds}` 
    if(isOpen){
      const noviObjekt = {
        nazivP: document.getElementById("nazivProjekta"),
        startP: vrijemeStart,
        stopP: vrijemeStop,
        trajanjeP: 0
      }
      postaviProjekte(projekti.concat(noviObjekt))  
      
    }
    setIsOpen(!isOpen);
    
  }

  const promjenaVidljivostiStart = () => { 
    postaviTipkuStartStop(false)
    postaviFormuTimer(true)
  }

  const promjenaVidljivostiStop = () => { 
    postaviTipkuStartStop(true)
    postaviFormuTimer(false)
    toggleModal()
  }

  const spremiPodatke = () =>{

  }
  // useEffect( () => {
    
  // },[projekti])

  return (
    <div className='container'>

      <div className='conNaslov'> 
        <h1>Timely</h1>
      </div>

      <div className='conTablice'>
      { tipkaStartStop ? 
        <div>
          <Tipka naziv="Start" klik={() => promjenaVidljivostiStart()} />
          <TablicaProjekata podatci={projekti} />
        </div> : 
        <div>
            <Tipka naziv="Stop" klik={() => promjenaVidljivostiStop()}/>
            <Stopwatch sejv={spremiPodatke}/>
            <TablicaProjekata />
        </div>}
      </div>

      <div className='modalniProzor'>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay">

          <div className='containerModal'>
            <div className='naslovModal'>Project name *</div>
            <div className='inputModal'>
              <input type="text" className='inputNaziv' id="nazivProjekta"></input>
            </div>
            <div className='btnModal'>
              <button onClick={toggleModal}>Save</button>
            </div>
          </div>

        </Modal>
      </div>

    </div>
  );
}

export default App;
