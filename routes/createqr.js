const express = require('express');
const router = express.Router();
const qrcode = require("qrcode");
const nodemailer = require("nodemailer");
const intervention = require('../models/intervention');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('createqr', {
        title: 'QRCODE IDENT', saisie: true
    });
}); 

/* POST SCAN */

router.post("/scan", (req, res, next) => {
  let input_identite = req.body.identite;
  let input_code = req.body.code;
  let input_salle = req.body.salle;
  let input_datePrevisionnelle = req.body.datePrevisionnelle;
  let input_heurePrevisionnelle = req.body.heurePrevisionnelle;
  let input_heureEntree = req.body.heureEntree;
  let input_heureFin = req.body.heureFin;
  let contenuQR = "http://localhost:3000/api/" +
   input_identite + "\n" + input_code + "\n" + input_salle + "\n" + input_datePrevisionnelle + "\n" + input_heurePrevisionnelle + "\n" + input_heureEntree + "\n" + input_heureFin; 

  ////creation de l'interventions
  
  const interventions = new intervention({
    codeIntervenant:  input_code,
    salle: input_salle,
    datePrevisionnelle: input_datePrevisionnelle,
    heurePrevisionnelle: input_heurePrevisionnelle,
    heureEntree: input_heureEntree,
    heureFin: input_heureFin,
    });

    interventions.save((err, result) => {
      if (err) console.log(err);
      console.log(result);
    });

  qrcode.toDataURL(contenuQR, (err, src) => {
    if (err) res.send("Un problème est survenu !!!");
    res.render("createqr", {
      title: "Générateur QR Code",
      saisie: false,
      qr_code: src
    });

    /// ENVOIE DU QR CODE PAR MAIL 

    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4fcacb45bbb6b1",
        pass: "2c54e73224569c"
      }
    });
    let mailOptions = {
      from: 'qrident@exemple.com',
      to: input_code + '@gmail.com',
      subject: "QRCode",
      text: "Envoi de QRCode",
      html: 'QRCode de "' + input_identite + '" : <img src="' + src + '"/>',
      attachments: [{
        filename: src,
        cid: src = "images/qrcode.jfif" // Mettre à l'identique img src
      }]
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error("mail pas bien envoyé");
        console.log(error);
      } else {
        logger.info("mail bien envoyé");
        console.log('Email sent: ' + info.response);
      }
    });
  });

  /// FIN DE L'ENVOIE DE MAIL
});

module.exports = router;
