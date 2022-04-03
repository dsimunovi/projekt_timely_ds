import React from 'react'
import Podatak from './Podatak'
import './TablicaProjekata.css'

const TablicaProjekata = ({podatci,promjenaVidljivostiUredi,izbrisi}) => {
    return (
        <div className='containerTP'>
            <table className='contTablice'>
                <thead>
                    <tr>
                    <th>Projekt</th>
                    <th>Start</th>
                    <th>Stop</th>
                    <th>Trajanje</th>
                    <th>Opcije</th>
                    </tr>              
                </thead>
                <tbody >
                    {podatci.map(el => <Podatak key={el.id} podatak={el} promjenaVidljivostiUredi = {()=>promjenaVidljivostiUredi(el.id)} izbrisi={()=>izbrisi(el.id)}  />)}
                </tbody>
            </table>
        </div>
)}
export default TablicaProjekata