var mongo = require('mongodb')

var conMongoDB = function(){ //WRAPPER(Função dentro de variáveç). Para não subir a conexão ao iniciar o servidor.
    var db = new mongo.Db(
        'loja', //nome do bd.
        new mongo.Server(
            'localhost', //endereço do servidor que esta o bd.
            27017, //porta de conexão
            {} //objeto com opção de config do servidor
        ), //instancia do bd.
        {} //Configurações opcionais para o bd.
    )
    return db
}

module.exports = function(){
    return conMongoDB
}
