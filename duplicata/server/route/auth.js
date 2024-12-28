const router = require('express').Router();
const user = require('../model/user');
const item = require('../model/menu')
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const email = require('./email')

const RSA_PRIVATE = fs.readFileSync(__dirname + '/rsa/private_key.pem', 'utf-8')
const RSA_PUBLIC = fs.readFileSync(__dirname + '/rsa/public_key.pem', 'utf-8')


router.post('/inscription', async (req, res) => {
    await user.inscription(req.body.nom, req.body.prenom, req.body.email, req.body.mdp).then( async result => {
        // console.log('inscription réussi');
        (async () => {
          try {
              await email.sendEmailInscription(req.body.email, "Création de compte valide", "Votre compte à bien été créé avec succès !");
          } catch (error) {
              console.error('Erreur lors de l\'envoi de l\'email :', error);
          }
      })();
      await user.connexion(req.body.email, req.body.mdp).then( result => {
        const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
            subject: result.id.toString(),
            algorithm: "RS256",
            expiresIn: 60 * 60 * 24 * 30 * 6,
        });
        res.cookie('token', token, { httpOnly: true});
        return res.json(true);
    }).catch( error => {
        return res.json(false);
    })       }).catch( error => {
        return res.json(false);
    })   
});

router.post('/connexion', async (req, res) => {
    await user.connexion(req.body.email, req.body.mdp).then( result => {
        const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
            subject: result.id.toString(),
            algorithm: "RS256",
            expiresIn: 60 * 60 * 24 * 30 * 6,
        });
        res.cookie('token', token, { httpOnly: true});
        return res.json(true);
    }).catch( error => {
        return res.json(false);
    })   
});

//on regarde dans le jwt l'id du user ensuite en récupère les données
router.post("/currentuser", async (req, res) => {
  // console.log("current user")
    if (req.headers.cookie != null) {
      const cookieArray = req.headers.cookie.split("; ");
      let token = null;
      cookieArray.forEach((cookie) => {
        const [key, value] = cookie.split("=");
        if (key.trim() === "token") {
          token = value;
        }
      });
  
      if (token) {
        try {
          const decodedToken = jsonwebtoken.verify(token, RSA_PUBLIC, { algorithms: ['RS256'] });
          if (decodedToken) {
            const userTmp = await user.findById(decodedToken.sub);
            if (userTmp) {
              return res.json(userTmp);
            } else {
              return res.json(null);
            }
          } else {
            return res.json(null);
          }
        } catch (e) {
          // console.log(e)
          return res.json(null);
        }
      } else {
        return res.json(null);
      }
    } else {
      return res.json(null);
    }
  });

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Déconnexion réussie' });
});

router.post('/informationSupp', async (req, res) => {
  await user.infoSupp(req.body.email).then( result => {
      return res.json(result);
  }).catch( error => {
      return res.json(false);
  })   
});

router.post('/uptadeInfo', async (req, res) => {
  await user.updateUser(req.body.id, 'France', req.body.credential.town, req.body.credential.address, req.body.credential.phone, req.body.credential.postal, req.body.credential.ordernote).then( result => {
    return res.json(true);
  }).catch( error => {
      return res.json(false);
  })   
});

router.post('/newOrder', async (req, res) => {
  await user.findById(req.body.id).then( async resultId => {
    // console.log("info utilisateur", resultId.email, resultId.prenom, resultId.nom)
    await user.newOrder(req.body.id,req.body.description,req.body.prix).then( result => {
      (async () => {
        try {
            await email.sendEmailTransaction(resultId.email, resultId.nom, resultId.prenom);
            // console.log('Email envoyé avec succès');
            return res.json(true);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
    })();
      // console.log("ajout de la transaction", result);
    }).catch( error => {
        // console.log('connexion échoué', error);
        return res.json(false);
    });
  })
});

router.post('/transactionHistory', async (req, res) => {
  await user.transactionHistory(req.body.email).then( result => {
    // console.log("historique des transactions", result);
    return res.json(result);
  }).catch( error => {
      // console.log('connexion échoué', error);
      return res.json(false);
  })   
});

router.post('/contact', async (req, res) => {
  // console.log("contact");

  await email.sendContact(req.body.email, req.body.nom, req.body.prenom, req.body.tel, req.body.message).then( result => {
    // console.log("email envoyé avec succée");
    return res.json(true);
  }).catch( error => {
    // console.log("email envoyé sans succée");
      return res.json(false);
  })   
});


module.exports = router;