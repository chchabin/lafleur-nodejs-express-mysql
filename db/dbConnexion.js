const dotenv = require('dotenv');
const mysql = require('mysql');
// Chargement du fichier .env
dotenv.config();

// Affectation des variables du fichier.env
const {DB_HOST,DB_USER,DB_PASS,DB_DATABASE}= process.env;
//Paramétrage de la connexion fournie par le fichier .env
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
});

//Établissement de la connexion
db.connect((err) => {
    if (err) {
        throw err;
    }
    // console.log('Mysql Connecté ....')
    console.log('Base de données : ' + db.state);
});
// Préparation de l'exécution d'une requête
query = async (sql, values) => {
    return new Promise((resolve, reject) => {
        const callback = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        // L'exécution appellera les requêtes préparées ou classiques
        db.query(sql, values, callback);
    }).catch(err => {
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // converti les erreurs mysql en statut HTTP
        err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

        throw err;
    });
};
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = {
    getLesCategories:async (param=[]) => {
        try {
            return await new Promise((resolve, reject) => {
                const sql = `select * from categorie`;
                // db.query(requête sql, paramètres s'ils existent, callback (soit erreur soit execution requête)
                db.query(sql, param, (err, result) => {
                    if (err) throw reject(new Error(err.message));
                    //Exécution de la requête s'il n'y a pas d'erreurs
                    resolve(result)
                })
            });

        } catch (error) {
            console.log(error);
        }
    },
    getLesProduitsDeCategorie:async (param=[]) => {
    try {
        return await new Promise((resolve, reject) => {
            // création de la requête paramétrée
            const sql = `select * from produit where idCategorie =?`;
            console.log(param)
            console.log(sql)
            db.query(sql, param,(err, result) => {
                if (err) throw reject(new Error(err.message));
                //Exécution de la requête s'il n'y a pas d'erreurs
                resolve(result)
            })
        });

    } catch (error) {
        console.log(error);
    }
},

}
