const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Intervention = new Schema({
    datePrevisionnelle: Date,
    heurePrevisionnelle: Date,
    
    heureEntree: Date,
    heureFin: Date,
    codeIntervenant: Number,
    salle: String,
  });

module.exports =  mongoose.model('interventions', Intervention, 'interventions');