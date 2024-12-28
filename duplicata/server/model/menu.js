const Database = require('../config/database.js');
const bcrypt = require('bcryptjs');

module.exports = class Item {

    static async items() {
        return new Promise((resolve, reject) => {
            try {
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        console.error('Error connecting to the database:', err);
                        reject(err);
                    } else {
                        let sql = `SELECT id,granule_items.nom, granule_items.prix, granule_items.description 
                                   FROM granule_items `;
                        db.connection.query(sql, (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
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

    static async getItemsByIds(itemIds) {
        return new Promise((resolve, reject) => {
            try {
                if (!Array.isArray(itemIds) || itemIds.length === 0) {
                    resolve([]); // Retourne un tableau vide si aucun ID n'est fourni
                    return;
                }
    
                const db = new Database();
                db.connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        const placeholders = itemIds.map(() => '?').join(',');
                        const sql = `SELECT granule_items.id, granule_items.nom, granule_items.prix, granule_items.description 
                                     FROM granule_items 
                                     WHERE granule_items.id IN (${placeholders})`;
    
                        db.connection.query(sql, itemIds, (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }    
    

};