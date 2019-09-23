module.exports.registerProduct = function(application, req, res) {
    var dadosForm = req.body

    req.assert('cod', 'Cod não pode ser vazio').notEmpty()
    req.assert('name', 'Name não pode ser vazio').notEmpty()
    req.assert('brand', 'Brand não pode ser vazio').notEmpty()
    req.assert('description', 'Description não pode ser vazio').notEmpty()
    req.assert('unitPrice', 'UnitPrice não pode ser vazio').notEmpty()
    req.assert('quantity', 'Quantity não pode ser vazio').notEmpty()

    var erros = req.validationErrors()

    if(erros){
        console.log(erros)
        // res.send('cadastro', {validacao: erros})
        return;
    }

    var connection = application.config.dbConnection
    var ProductDAO = new application.app.models.ProductDAO(connection)
    
    ProductDAO.RegisterProduct(req, res, dadosForm)
}