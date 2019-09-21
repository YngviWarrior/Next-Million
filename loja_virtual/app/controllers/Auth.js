module.exports.Auth = function(application, req, res) {
    var dadosForm = req.body

    req.assert('email', 'Email não pode ser vazio').notEmpty()
    req.assert('password', 'Password não pode ser vazio').notEmpty()

    var erros = req.validationErrors()

    if(erros){
        console.log(erros)
        // res.send('cadastro', {validacao: erros})
        return;
    }

    var connection = application.config.dbConnection
    var UserDAO = new application.app.models.UserDAO(connection)
    
    UserDAO.Auth(req, res, dadosForm)
}