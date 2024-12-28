const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;
const auth = require('./route/auth');
const stripeRoutes = require('./route/stripe'); // Importez correctement les routes Stripe
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const emailRoutes = require('./route/email'); // Importez vos routes
require('dotenv').config();
const items = require('./route/item')

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(session({
  secret: 'secrettathai',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.static('../public', {
  maxAge: '1d' // Cache les fichiers CSS pendant 1 jour
}));

app.use(bodyParser.json());
app.use(cors());  // Assurez-vous que CORS est configuré pour permettre les requêtes cross-origin

// Routes
app.use("/api", auth);
app.use("/commande", stripeRoutes);  // Assurez-vous d'utiliser les routes Stripe correctement
app.use("/items", items);

// Fallback route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Route pour afficher que le serveur fonctionne
app.get('/status', (req, res) => {
  res.send(`Le serveur fonctionne sur http://granule-pauillac.fr:${port}.`);
});

app.listen(port, () => {
  // console.log('Server app listening on port ' + port);
});