import React from 'react'
import Podatak from './Podatak'
import './TablicaProjekata.css'

const TablicaProjekata = ({podatci}) => {
    return (
        <div className='containerTP'>
            <table className='contTablice'>
                <thead>
                    <tr>
                    <th>Projekt</th>
                    <th>Start</th>
                    <th>Stop</th>
                    <th>Trajanje</th>
                    </tr>              
                </thead>
                <tbody id="tu">
                    {podatci.map(el => <Podatak podatak={el}/>)}
                </tbody>
            </table>
        </div>    )
    }

export default TablicaProjekata