const Database = require('../config/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    static async exist(email) {
        return new Promise((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        console.error('Error connecting to the database:', err);
                        reject(err);
                    } else {
                        let sql = "SELECT * FROM granule_users WHERE email = ?;";
                        db.connection.query(sql, [email], (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results.length > 0);
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Error during email existence check:', error);
                reject(error);
            }
        });
    }

    static async infoSupp(email) {
        return new Promise((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        console.error('Erreur de connexion à la base de données:', err);
                        reject(err);
                    } else {
                        let sql = "SELECT * FROM granule_users WHERE email = ?;";
                        db.connection.query(sql, [email], (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                if (results[0]) {
                                    // console.log("Utilisateur trouvé info:", results[0]);
                                    resolve(results[0]); // Résoudre avec les informations utilisateur
                                } else {
                                    resolve(null); // Pas d'utilisateur trouvé
                                }
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'email:', error);
                reject(error);
            }
        });
    }
    

    static async inscription(nom, prenom, email, mdp) {
        return new Promise(async (resolve, reject) => {
            try {
                const emailExists = await User.exist(email);
                if (emailExists) {
                    reject('Email already taken');
                } else {
                    // console.log("Starting database connection");
                    const db = new Database();
                    db.connection.connect(async (err) => {
                        if (err) {
                            console.error('Error connecting to the database:', err);
                            reject(err);
                        } else {
                            // console.log('Database connected successfully');

                            // Hash the password
                            const saltRounds = 10;
                            const hashedPassword = await bcrypt.hash(mdp, saltRounds);

                            let sql = "INSERT INTO granule_users (nom, prenom, email, mdp) VALUES (?, ?, ?, ?);";
                            db.connection.query(sql, [nom, prenom, email, hashedPassword], (error, result) => {
                                if (error) {
                                    console.error('Error executing query:', error);
                                    reject(error);
                                } else {
                                    // console.log(result);
                                    resolve(result);
                                }
                            });
                        }
                    });
                }
            } catch (error) {
                console.error('Error during registration:', error);
                reject(error);
            }
        });
    }

    static async connexion(email, mdp) {
        return new Promise((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        console.error('Error connecting to the database:', err);
                        reject(err);
                    } else {
                        let sql = "SELECT * FROM granule_users WHERE email = ?;";
                        db.connection.query(sql, [email], async (error, results) => {
                            if (error) {
                                reject(error);
                            } else if (results.length > 0) {
                                const user = results[0];
                                const match = await bcrypt.compare(mdp, user.mdp);
                                if (match) {
                                    resolve(user);
                                } else {
                                    reject('Invalid password');
                                }
                            } else {
                                reject('User not found');
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Error during login:', error);
                reject(error);
            }
        });
    }

    static async forgotMdp(email, mdp) {
        return new Promise((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        let sql = "SELECT * FROM granule_users WHERE email = ?;";
                        db.connection.query(sql, [email], async (error, results) => {
                            if (error) {
                                reject(error);
                            } else if (results.length > 0) {
                                
                                if (match) {
                                    resolve(user);
                                } else {
                                    reject('Invalid password');
                                }
                            } else {
                                reject('User not found');
                            }
                        });
                    }
                });
            } catch (error) {
                console.error('Error during login:', error);
                reject(error);
            }
        });
    }

    static async findById(id) {
        return new Promise ((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect();

                let sql = "SELECT * FROM granule_users WHERE id = ?;";
                db.connection.query(sql, id, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result[0]);
                    }
                    db.connection.end();
                });
            } catch (error) {
                console.error('Error during login:', error);
                reject(error);
            }
        })
    }


    static async newOrder(id, description, prix) {
        return new Promise ((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect();

                let sql = "INSERT INTO `granule_transaction`(user_id, commande, prix, date) VALUES (?,?,?,NOW());";
                db.connection.query(sql, [id, description, prix], (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result[0]);
                    }
                    db.connection.end();
                });
            } catch (error) {
                console.error('Error during login:', error);
                reject(error);
            }
        })
    }

    static async transactionHistory(email) {
        return new Promise ((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect();

                let sql = "SELECT granule_transaction.commande, granule_transaction.prix, granule_transaction.date FROM granule_transaction INNER JOIN granule_users ON granule_transaction.user_id = granule_users.id WHERE granule_users.email = ?";
                db.connection.query(sql, email, (error, result) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    db.connection.end();
                });
            } catch (error) {
                console.error('Error during login:', error);
                reject(error);
            }
        })
    }

    static async updateUser(id, pays, ville, adresse, tel, postal, commentaireAdresse) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect();
    
                let sql = `UPDATE granule_users SET pays = ?, ville = ?, adresse = ?, tel = ?, postal = ?, commentaireAdresse = ? WHERE id = ?;`;
    
                db.connection.query(sql, [pays, ville, adresse, tel, postal, commentaireAdresse, id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result[0]);
                    }
                    db.connection.end();
                });
            } catch (error) {
                console.error('Error during user update:', error);
                reject(error);
            }
        });
    }
    
};
