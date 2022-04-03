const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const Projekt = require('./models/projekt')
  

app.get('/', (req, res) =>{
    res.send('<h1>Pozdrav od Express servera!</h1>')
})

app.get('/api/projekti', (req, res) =>{
    Projekt.find({}).then(rezultat =>{
    res.json(rezultat)
    console.log("svi projekti")
    })
})

app.get('/api/projekti/:id', (req, res, next) =>{
    Projekt.findById(req.params.id)
    .then(rezultat =>{ 
    if(rezultat){
        res.json(rezultat)
    }else{
        res.status(404).end()
    }
    })
    .catch(err =>{
    next(err)
    })
})

app.delete('/api/projekti/:id', (req, res) => {
    Projekt.findByIdAndRemove(req.params.id).then(rezultat =>{
    console.log("Podatak izbrisan")
    res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/projekti', (req, res) => {
    
    const podatak = req.body
    if(!podatak.nazivP){
        return res.status(400).json({
            error: 'Nedostaje sadržaj'
        })
    }
    
    const noviProjekt = new Projekt({
        nazivP: podatak.nazivP,
        startP : podatak.startP,
        stopP : podatak.stopP,
        trajanjeP: podatak.trajanjeP
    })

    noviProjekt.save().then(rezultat => {
        res.json(rezultat)
    })
})
    
app.put('/api/projekti/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id

    const projekt = {
        nazivP: podatak.nazivP,
        startP : podatak.startP,
        stopP : podatak.stopP,
        trajanjeP: podatak.trajanjeP
    }
    //u fji fndbyidandupdate se moze slati i stari i novi podatak..zbog toga new:true
    Projekt.findByIdAndUpdate(id, projekt, {new: true})
    .then( noviProjekt => {
    res.json(noviProjekt)
    })
    .catch(err => next(err))
})

// const generirajId = () => {
//     const maxId = projekti.length > 0
//     ? Math.max(...projekti.map(p => p.id))
//     : 0
//     return maxId + 1
// }

const errorHandler = (err, req, res, next ) => {
    console.log(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({error: 'krivi format ID-a'})
    }
    next(err)
}

function zadnjiErrorHandler (err, req, res, next) {    
    res.status(500).send('error', { error: err })
}

app.use(errorHandler)
app.use(zadnjiErrorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})