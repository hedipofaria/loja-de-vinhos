var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var CompraSchema = new Schema({
    codigo: String,
    data: String,
    cliente: String,
    itens: [{
        produto: String,
        variedade: String,
        pais: String,
        categoria: String,
        safra: String,
        preco : Number
    }],
    valorTotal: Number
});
 
module.exports = mongoose.model('Compra', CompraSchema);