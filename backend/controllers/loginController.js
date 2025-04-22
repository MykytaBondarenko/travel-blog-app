const db = require('../database.js');

exports.getUserPasswordHash = (req, res) => {
    const data = req.query;
    const username = data.username;

    let queryContent = `SELECT password FROM User WHERE username = '${username}'`;
    console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}

exports.createUserData = (req, res) => {
    const data = req.body;
    const username = data.username;
    const email = data.email;
    const password = data.password;

    let queryContent = `INSERT INTO User (username, password, email, address) VALUES ('${username}', '${password}', '${email}', '')`;
    console.log(queryContent);

    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )
}