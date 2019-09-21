module.exports = function(application){
	application.post('/auth', function(req, res){
		application.app.controllers.Auth.Auth(application, req, res)
	});
}