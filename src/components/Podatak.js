import React from 'react'
import Opcije from './Opcije'
import './Podatak.css'

const Podatak = ({podatak}) => {
    return (
        <tr className='red'>
            <td>{podatak.nazivP}</td>
            <td>{podatak.startP}</td>
            <td>{podatak.stopP}</td>
            <td>{podatak.trajanjeP}</td>
            <td>{podatak.opcijeP}</td>
        </tr>)}

export default Podatak