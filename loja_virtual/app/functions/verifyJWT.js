var jwt = require('jsonwebtoken')
require('dotenv-safe').config();

module.exports = function verifyJWT(req, res){
	var token =  req.headers.authorization.substring(7, req.headers.authorization.length)
	
	if (!token) 
		res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) 
			res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		
		// se tudo estiver ok, salva no request para uso posterior
		req.userId = decoded
	});
}

