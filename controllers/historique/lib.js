const Historique = require('../../schema/schemaHistorique.js');


function addHistorique(req, res) {
    if (!req.body.user || !req.body.gain || !req.body.score || !req.body.map) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        let historique = {
            user: req.body.user,
            score: req.body.score,
            gain: req.body.gain,
            map: req.body.map,
            date: req.body.date,

        }

try{
            let _u = new Historique(historique);
            _u.save(function (err, historique) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "score": historique.score

                    })
                }
            })

        }catch( error){
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;


                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        }


    }
}

function getAllHistorique(req,res) {

    Historique.find((err, people) => {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            if (err) return res.status(500).send(err)
            // send the list of all people
            return res.status(200).send(people);
        })

}





function getScoreMax(req,res) {
//console.log(Date(),req.params.user);
    Historique.find({user : "wadica2@hotmail.fr"}).sort({date : -1}).limit(1).then(max => {

        // send the list of all people
        return res.status(200).send(max[0]["score"]);
    },err=> {
        if (err) return res.status(200).send(0);

    })
}


//On exporte nos deux fonctions

exports.getAllHistorique = getAllHistorique;
exports.addHistorique = addHistorique;
exports.getScoreMax  =getScoreMax ;