const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modele Collection Intervention
let Salle = new Schema({
  nom: String,
  capacite: String
});

module.exports = mongoose.model("Salles", Salle);

