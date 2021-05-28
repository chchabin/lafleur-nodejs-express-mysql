const express = require('express');
const router = express.Router();
const voirProduits = require('../controller/voirProduits');
//code des routes à ajouter ici
// création de la Route vers accueil
router.get('/', (req, res) => {
    res.render('accueil');
});
router.get('/voirProduits',voirProduits.voirCategories);
router.get('/voirProduits:num',voirProduits.voirProduit);

module.exports = router;
