import React, {useState} from 'react'
import './ModalniProzor.css'
import Modal from "react-modal";

const ModalniProzor = ({turnModalOff,mod}) => {
  const [ unos, postaviUnos] = useState('')

  const turnOff = () =>{
    if(unos===""){
      alert("Niste unijeli naziv!")
      return;
    }
    else{
      mod=false;
      turnModalOff(unos)
    }
  } 

  return (
  <div className='modalniProzor'>
      <Modal
        isOpen={mod}
        onRequestClose={turnOff}
        contentLabel="My dialog"
        ariaHideApp={false}
        className="mymodal"
        id="modalniprozor"
        overlayClassName="myoverlay" >
        <div className='containerModal'>
          <div className='naslovModal'>Project name *</div>
          <div className='inputModal'>
            <input type="text" className='inputNaziv' onChange={(e) => postaviUnos(e.target.value)}></input>
          </div>
          <div className='btnModal'>
            <button onClick={turnOff} >Save</button>
          </div>
        </div>
      </Modal>
  </div>
  )
}

export default ModalniProzor