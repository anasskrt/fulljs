const Stripe = require('stripe');
const router = require('express').Router();

// Utilisez votre clé API secrète de Stripe
const stripe = Stripe('supprimer'); // Remplacez par votre clé API secrète Stripe

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  // console.log('Requête reçue pour créer une intention de paiement:', amount, currency);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    // console.log('Intention de paiement créée:', paymentIntent);
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // console.error('Erreur lors de la création de l\'intention de paiement:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
