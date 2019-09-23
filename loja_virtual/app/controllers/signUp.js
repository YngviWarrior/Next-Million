module.exports.signUp = function(application, req, res){
    var dadosForm = req.body

    req.assert('name', 'Nome não pode ser vazio').notEmpty()
    req.assert('last_name', 'Nome não pode ser vazio').notEmpty()
    req.assert('password', 'Senha não pode ser vazio').notEmpty()
    req.assert('sex', 'Casa não pode ser vazio').notEmpty()
    req.assert('birth_date', 'Casa não pode ser vazio').notEmpty()
    req.assert('cpf', 'Casa não pode ser vazio').notEmpty()
    req.assert('email', 'Casa não pode ser vazio').notEmpty()
    // req.assert('cep', 'Casa não pode ser vazio').notEmpty()

    var erros = req.validationErrors()

    if(erros){
        console.log(erros)
        // res.send('cadastro', {validacao: erros})
        return;
    }

    var connection = application.config.dbConnection
    var UserDAO = new application.app.models.UserDAO(connection)
    
    UserDAO.SignUp(req, res, dadosForm)    
}