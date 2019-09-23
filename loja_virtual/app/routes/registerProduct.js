module.exports = function(application){
	application.post('/registerProduct', function(req, res){
		application.app.controllers.registerProduct.registerProduct(application, req, res)
	});
}