import React, {useState, useEffect} from 'react'
import './App.css';
import Tipka from './components/Tipka'
import TablicaProjekata from './components/TablicaProjekata';
import Stoperica from './components/Stoperica';
import ModalniProzor from './components/ModalniProzor';
import projektiAkcije from './services/projekti'


function App() {
  const [ tipkaStartStop, postaviTipkuStartStop] = useState(false)
  const [ modal, postaviModal] = useState(false)
  const [ formaUredi, postaviFormuUredi] = useState(false)
  const [ projekti, postaviProjekte] = useState([])
  const [ modStoperica, postaviModStoperica] = useState(0)
  const [ vrijemeStart, postaviVrijemeStart] = useState('')
  const [ vrijemeStop, postaviVrijemeStop] = useState('')
  const [ interval, postaviInterval] = useState(0);
  const [uredivanje,postaviUredivanje] = useState('')
  
  useEffect( () => {
    projektiAkcije.dohvatiSve()
    .then(res => postaviProjekte(res.data))
  }, [])

  function toggleModalOff(unos,e) {  

    const noviObjekt = {
      nazivP: unos,
      startP: vrijemeStart,
      stopP: vrijemeStop,
      trajanjeP: interval
    }

    projektiAkcije.stvori(noviObjekt)
    .then(res=>{
      postaviProjekte(projekti.concat(res.data))
    })

    postaviModal(false);
  }

  function toggleModalOn() {  
    postaviModal(true);
  }

  const izbrisi = (id) =>{
    projektiAkcije.brisi(id)
    .then(response =>{
      // console.log(response)
      postaviProjekte(projekti.filter(p => p.id !== id))
    })
  }

  
  const promjenaVidljivostiUredi = (id) =>{
    // console.log(id)
    postaviUredivanje(id)
    postaviFormuUredi(true)
  }

  const promijeniOpis = (opisureden) =>{
    // console.log(uredivanje,opisureden)
    const projekt = projekti.find(p => p.id === uredivanje)
    const modProjekt = {
      ...projekt,
      nazivP: opisureden
    }

    projektiAkcije.osvjezi(uredivanje, modProjekt)
    .then(response =>{
      postaviProjekte(projekti.map(p=> p.id !== uredivanje ? p : response.data))
    })
    postaviFormuUredi(false)
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
          <Stoperica mod={modStoperica} vratiPodatke={spremiPod} />
        </div>

        {modal ? <ModalniProzor turnModalOff={toggleModalOff} mod={modal} /> : null}
        {formaUredi ? <ModalniProzor  turnModalOff={promijeniOpis}  mod={formaUredi} /> : null }
        {projekti.length > 0 ? <TablicaProjekata podatci={projekti}  promjenaVidljivostiUredi={promjenaVidljivostiUredi} izbrisi={izbrisi}/> : null}
      
      </div>
    </div>
  );
}

export default App;
