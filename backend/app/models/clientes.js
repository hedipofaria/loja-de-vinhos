var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ClienteSchema = new Schema({
    id: Number,
    nome: String,
    cpf: String
});
 
module.exports = mongoose.model('Cliente', ClienteSchema);