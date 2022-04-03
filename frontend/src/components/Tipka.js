import React from 'react'
import './Tipka.css'

const Tipka = ({naziv,klik}) => {
  return (
        <div className='containerTipka'><button className='btn' onClick={klik}>{naziv}</button>    </div>
  )
}

export default Tipka