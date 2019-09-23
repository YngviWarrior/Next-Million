// var jwt = require('jsonwebtoken')
var verifyJWT = require('../functions/verifyJWT')

function ProductDAO(connection){
    this._connection = connection()
}

ProductDAO.prototype.RegisterProduct = function(req, res, product){
    this._connection.open( function(err, mongoclient) {
        mongoclient.collection("product", function(err, collection){
            verifyJWT(req, res)
            collection.find({cod: {$eq: product.cod}}).toArray(function(err, result){
                if(err)
                    res.status(400).json(err)
                else if(result[0] != undefined && result[0].cod ==  product.cod)
                    res.status(400).json({'msg': 'Already exist this product.'})
                else {
                    collection.insert(product, function(err, records){
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

module.exports = function(){
     return ProductDAO
}
    