var Compras = require('../models/compras');

// RESPOSTA DA 02 - 2 - Mostre o cliente com maior compra única no último ano (2016)

module.exports.getQuery = function(){
    return Compras
        .aggregate([
            {$project: { 
                 _id:0
                ,codigo:1
                ,cliente:1
                ,valorTotal:1
                ,numero_de_compras: {$cond:{if:{$isArray:"$itens"},then:{$size:"$itens"},else:"0"}}
                ,ano: {$year:{$dateFromString: {dateString:"$data",format: "%d-%m-%Y"}}}
            }},
            {$match: {ano:2016}},
            {$match: {numero_de_compras:1}},

			{$lookup: {
				from: "clientes",
				localField: "cliente",
				foreignField: "cpf",
				as: "dado_do_cliente"
			}},
			{$project: {
				cliente:1,
				valorTotal:1,
				"dado_do_cliente.nome":1
			}},


            {$sort : {valorTotal: -1}},
            {$limit : 1},
        ]);
}