const historique = require('./historique/lib.js');


module.exports = function (app) {


    app.post('/add',historique.addHistorique);
    app.get('/all',historique.getAllHistorique);
    app.get('/scoremax',historique.getScoreMax);

}
