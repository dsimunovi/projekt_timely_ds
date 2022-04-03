const mongoose = require('mongoose')
// const password = process.env.ATLAS_PASS
const password = "korisnik1234"
const dbname = 'timelyProjekt'
const url = `mongodb+srv://korisnik01:${password}@bazapodatakav07.eexyy.mongodb.net/${dbname}?retryWrites=true&w=majority`

const projektSchema = new mongoose.Schema({
 nazivP: String,
 startP: String,
 stopP: String,
 trajanjeP: String
})

projektSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
}
})

const Projekt = mongoose.model('Projekt', projektSchema, 'projekti')

console.log("Spajamo se na bazu")
 
mongoose.connect(url)
  .then(result => {
    console.log("Spojeni smo na bazu");
  })
  .catch(error => {
    console.log("Greška pri spajanju", error.message);
})
module.exports = Projekt;