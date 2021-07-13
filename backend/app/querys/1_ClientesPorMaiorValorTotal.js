var Compras = require('../models/compras');

// RESPOSTAS DA 01 - 1 - Listar os clientes ordenados pelo maior valor total em compras

// module.exports.getQuery = function(){
//     return Compras
//                 .aggregate([
//                      {$project: {_id:0, cliente:1, valorTotal: 1}}
//                     ,{$sort : {valorTotal: -1}} 
//                 ]);
// }

module.exports.getQuery = function(){
    return Compras

		.aggregate([
			{$project: {
							_id:0,
							cliente:1,
							valorTotal: 1}
			},
			{$sort : {valorTotal: -1}},
			{$lookup: {
						from: "clientes",
						localField: "cliente",
						foreignField: "cpf",
						as: "dados_dos_cliente"
			}},
			{$project: {
							cliente:1,
							valorTotal:1,
							"dados_dos_cliente.nome":1
			}}
		])
}
