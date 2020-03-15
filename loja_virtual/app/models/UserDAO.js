var crypto = require('crypto')
var jwt = require('jsonwebtoken')
require('dotenv-safe');

function UserDAO(connection){
    this._connection = connection()
}

UserDAO.prototype.signUp = function(req, res, user){
    this._connection.open( function(err, mongoclient) {
        mongoclient.collection("user", function(err, collection){

            collection.find({email: {$eq: user.email}}).toArray(function(err, result){
                if(err)
                    res.status(400).json(err)
                else if(result[0] != undefined && result[0].email ==  user.email)
                    res.status(400).json({'msg': 'Already exist this email.'})
                else {
                    //forma de criptografia, oque iremos criptografar, forma de saida do resultado.
                    user.password = crypto.createHash('md5').update(user.password).digest('hex')
                    collection.insert(user, function(err, records){
                        if(err)
                            res.status(500).json({'status': 'Insert error'})
                        
                        res.status(200).json({'msg': 'Success.'})
                    })
                }
                mongoclient.close()
            })
        })
    })
}

UserDAO.prototype.Auth = function(req, res, user){
    this._connection.open( function(err, mongoclient) {
        mongoclient.collection("user", function(err, collection){
             //forma de criptografia, oque iremos criptografar, forma de saida do resultado.
             user.password = crypto.createHash('md5').update(user.password).digest('hex')

            // {user: user.user}, password: user.password}} //Como é de igualdade posso não usar os operadores de igualdade.
            collection.find({user: {$eq: user.user}, password: {$eq: user.password}}).toArray(function(err, result){
                if(result[0] != undefined){
                    //JWT
                    const id = result[0]._id
                    var token = jwt.sign({ id }, process.env.SECRET, {
                        expiresIn: 300 // expires in 5min
                    });

                    req.session.auth = token //Variavel de sessão
                    req.session.email = result[0].email //Variavel de sessão

                    res.status(200).json({'msg': 'Loged In.'})
                }else{
                    // res.render('index', {validacao: {}, dadosForm: user, msg: 'A'})
                    res.status(400).json({'msg': 'Wrong credentials.'})
                }
            })
            mongoclient.close()
        })
    })
}

module.exports = function(){
     return UserDAO
}
    