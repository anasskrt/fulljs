const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Créer un transporteur avec Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Utilisation des variables d'environnement
  port: process.env.SMTP_PORT,
  secure: true, // true pour SSL, false pour STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Fonction pour envoyer un e-mail
const sendEmailInscription = async (to) => {
    try {
      await transporter.sendMail({
        from: `"Granule Pauillac" <${process.env.SMTP_USER}>`,
        to,
        subject : "Création de compte valide",
        text : `Nous sommes ravis de vous compter parmi les membres de granule-pauillac.fr ! \
                
Votre inscription a bien été prise en compte. Vous pouvez dès maintenant profiter de tous les services et avantages que nous offrons. N’hésitez pas à explorer les différentes fonctionnalités et découvrir ce que nous avons préparé pour vous. \

Pour des raisons de sécurité, nous ne stockons pas votre mot de passe en clair. Si vous l'oubliez, merci de nous contacter. \

---

Besoin d'aide ? \
Si vous avez des questions ou si vous rencontrez des difficultés, notre équipe est à votre disposition. Contactez-nous à ce même e-mail (contact@granule-pauillac.fr) ou consultez notre [FAQ](https://www.granule-pauillac/faq).\

Merci encore pour votre confiance et bienvenue dans notre communauté !\

À bientôt,  \
L'équipe de Granulé Paiullac`
      });

      return true;
    } catch (error) {
      throw error;
    }
  };

  function capitalizeFirstLetter(string) {
    if (!string) return ''; // Gérer les cas où la chaîne est vide ou null
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Fonction pour envoyer un e-mail
const sendEmailTransaction = async (to, nom, prenom) => {
    try {
      await transporter.sendMail({
        from: `"Granule Pauillac" <${process.env.SMTP_USER}>`,
        to,
        subject : "Votre transaction a été validée avec succès",
        text : `Bonjour ` + capitalizeFirstLetter(prenom) + ' ' + capitalizeFirstLetter(nom) + `,

Nous sommes heureux de vous informer que votre transaction a été validée avec succès. 

Votre paiement a été traité avec succès et le montant a été débité de votre compte. Vous pouvez consulter les détails de votre transaction à tout moment en vous connectant à votre espace client.

---
Une question ?
Si vous avez des questions concernant cette transaction ou si vous avez besoin d’assistance, n’hésitez pas à nous contacter :
- Par e-mail : [contact@granule-pauillac.fr]

Nous vous remercions pour votre confiance et espérons vous revoir bientôt sur granule-pauillac.fr.

Cordialement,  
L'équipe de granule-pauillac.fr`

      });

      return true;
    } catch (error) {
      throw error;
    }
  };
  
  const sendContact = async (email, nom, prenom, tel, message) => {
    try {
      await transporter.sendMail({
        from: `"Granule Pauillac" <${process.env.SMTP_USER}>`,
        to : `${process.env.SMTP_USER}`,
        subject : "Prise de contact",
        text : 'nom : ' + nom + 
        '\n prenom : ' + prenom + 
        '\n email : ' + email + 
        '\n tel : ' + tel +
        '\n ' + message 
      });

      return true;
    } catch (error) {
      throw error;
    }
  };

  
  module.exports = { sendEmailInscription, sendEmailTransaction, sendContact };
