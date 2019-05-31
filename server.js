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

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//Définition du routeur
let router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);
app.use('/historique', router);
require(__dirname + '/controllers/historiqueController')(router);



app.get('/bonjour',function(req,res){

    account.direBonjour(req,res);
})
let busboy     = require('connect-busboy');
let fs      = require('fs'),
    path    = require('path'),
    async   = require('async');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(busboy());


app.get('/listFile',function(req,res){
    let myDir = [];
    fs.readdir(path.join(__dirname),(err, result)=>{
        async.each(result,(file, callback) => {
            // --
            fs.stat(path.join(__dirname,file), (err, stat) => {
                if(!stat.isFile()){
                    myDir.push('http://localhost:8008/files/'+file+'');
                }
                callback()
            })
        },(err)=>{
            res.status(200).json({repo : myDir})
        })
    })
});
app.get('/files/:path', function (req, res) {
    res.sendFile(path.join(__dirname,req.params.path))
});

//Définition et mise en place du port d'écoute
var port = 8008;
app.listen(port, () => console.log(`Listening on port ${port}`));