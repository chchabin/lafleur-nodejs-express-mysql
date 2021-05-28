// chargement du module
const express = require('express');
// appel du module
const app = express();
// paramétrage du port
const port = 8088;
const router=require('./routes/routes');
// module de gestion de chemin
const path = require('path');
// module pour la création de la page layout
const layout = require('express-layout');

// code pour la mise en place des vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
    layout()
    // paramétrage du lien sur le répertoire public
    , express.static(path.join(__dirname, 'public'))

];
// exécution du tableau middlewares
app.use(middlewares);
app.use ('/',router);


// Gestion des erreurs HTTP
app.use((req, res, next) => {
    res.status(404).send("Désolé, nous ne pouvons pas accéder à votre requête !");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose bloque!');
});

// ouverture du serveur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
