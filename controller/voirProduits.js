const db = require('../db/dbConnexion');

module.exports = {
    voirCategories: async (req, res) => {
        const lesCategories = await db.getLesCategories();
        //Appel de la vue produit et envoie des données
        res.status(200).render('categories', {
            lesCategories: lesCategories
        });
    },
    voirProduit: async (req, res) => {
        // Récupération du code renvoyé dans l'URL
        const num = req.params.num;

        // Récupération des catégorie, car vous allez rappeler la vue categorie
        const lesCategories = await db.getLesCategories();

        // Récupération des produits en fonction de la catégorie (passée en paramètre dans l'URL)
        const getLesProduitsDeCategorie = await db.getLesProduitsDeCategorie(num);
        console.log(JSON.stringify(getLesProduitsDeCategorie))
        // Affichage de la vue Produit avec les paramètres
        res.status(200).render('produits', {
            lesCategories: lesCategories,
            lesProduits: getLesProduitsDeCategorie,
            categorie:num
        });
    },
    ajouterAuPanier: async (req, res) => {

    }
}
