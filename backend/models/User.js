const db = require("../config/db"); // Ensure this connects to MySQL

async function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); // Return first matching user
        });
    });
}

async function createUser(first_name, last_name, email, password, role) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
            [first_name, last_name, email, password, role],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

module.exports = { findUserByEmail, createUser };
