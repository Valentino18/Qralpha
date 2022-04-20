var express = require('express');
var router = express.Router();
const Salles = require("../models/salle");

// Page racine
router.get("/", async function (req, res, next) {
    Salles.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("Salles", {
                title: "Générateur QR Code",
                salles: result
            });
        }
    });
});

module.exports = router;