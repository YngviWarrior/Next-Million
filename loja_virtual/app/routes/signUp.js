module.exports = function(application){
	application.post('/signup', function(req, res){
		application.app.controllers.signUp.signUp(application, req, res)
	});
}