//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//Connexion à la base de donnée
mongoose.connect('mongodb://127.0.0.1:27017/kidsCode',{useNewUrlParser: true} ).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});
mongoose.set('useCreateIndex', true);

//On définit notre objet express nommé app
const app = express();

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());


//Définition du routeur
var router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);

const account = require('./controllers/account/lib.js');

app.post('/signup',function(req,res){

    account.signup(req,res);
})
app.post('/login',function(req,res){

    account.login(req,res);
})

app.post('/bonjour',function(req,res){

    account.direBonjour(req,res);
})


//Définition et mise en place du port d'écoute
var port = 8008;
app.listen(port, () => console.log(`Listening on port ${port}`));