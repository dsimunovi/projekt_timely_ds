import React from 'react'
import Opcije from './Opcije'
import './Podatak.css'

const Podatak = ({podatak,promjenaVidljivostiUredi,izbrisi}) => {
    return (
        <tr className='red'>
            <td>{podatak.nazivP}</td>
            <td>{podatak.startP}</td>
            <td>{podatak.stopP}</td>
            <td>{podatak.trajanjeP}</td>
            <td><Opcije  klik1={promjenaVidljivostiUredi} klik2 = {izbrisi}/></td>
        </tr>)}

export default Podatak