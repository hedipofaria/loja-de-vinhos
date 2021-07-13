var Compras = require('../models/compras');

// RESPOSTA DA 03 - 3 - Liste os clientes mais fiéis

module.exports.getQuery = function(){
    return Compras
        .aggregate([
            {"$group": { 
                     "_id": { cliente: "$cliente"}
                    ,count: {$sum:1}
                }
            },
			{$lookup: {
				from: "clientes",
				localField: "_id.cliente",
				foreignField: "cpf",
				as: "dados_dos_clientes"
			}},
			// {$project: {
			// 	cliente:1,
			// 	valorTotal:1,
			// 	"dados_dos_clientes.nome":1
			// }},
            {$sort : {count: -1}}
        ]);
}