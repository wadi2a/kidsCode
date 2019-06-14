const User = require('../../schema/schemaUser.js');
const passwordHash = require("password-hash");

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        let user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        let findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        resolve(true)
                    } else {
                        reject(204)
                    }
                }
            })
        })

        findUser.then(function () {
            let _u = new User(user);
            _u.update(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "user":  user.getUtilisateur(),
                        "user": user.getFirstname(),
                        "user": user.getName(),
                        "user": user.getAge(),
                        "user": user.getSex()


                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

let direBonjour = function(req, res) {
    console.log('Bonjour !');
    res.status(200).json({

        "text": "<p>Bonjour !</p>"
    })
}

let direByeBye = function(req, res) {
    res.status(200).json({

        "text": "Bye Bye !"
    })
}

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;