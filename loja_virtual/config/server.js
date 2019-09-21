/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */
var expressSession = require('express-session');

/* importar o módulo do multi-party */
var multiparty = require('connect-multiparty');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());// Aceita multiparty/formdata

/* configurar o middleware express-validator */
app.use(expressValidator());

app.use(function(req, res, next){ //Preflight XML REQUEST
    
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    //Permite reescrever as propriedades dos headers
    res.setHeader("Access-Control-Allow-Headers", "content-type") 
    res.setHeader("Access-Control-Allow-Credentials", true) 
    
    next()
})

/* configurar o middleware express-session */
app.use(expressSession({   // Para uso de cookies !!
	secret: 'umachave', //Segredo para assina o cookie de sessão
	resave: false, // FALSE grava 1 vez, TRUE grava em todos os requests.
	saveUninitialized: false // TRUE criar sessao novo sempre que a mesma for modificada
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/dbConnection.js') //espeficica para nao criar loop do arquivo server.
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;