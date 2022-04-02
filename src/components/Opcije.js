import React from 'react'
import Tipka from './Tipka'


const Opcije = ({klik1,klik2}) => {
    return (
            <>
                <Tipka className="btnUredi"  naziv="Uredi"  klik={klik1}/>
                <Tipka className="btnIzbrisi"  naziv="Izbriši" klik={klik2} />
            </>
        )
}

export default Opcije