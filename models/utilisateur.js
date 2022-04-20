const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let utilisateur = new Schema({
    nom: String,
    prenom: String,
    mail: String,
    code: String,
    poste: String,
});

module.exports = mongoose.model('utilisateurs', utilisateur);