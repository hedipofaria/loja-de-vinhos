var Compras = require('../models/compras');

module.exports.getQuery = function(cpf){
    return Compras
    .aggregate([
	    {$match: {cliente:cpf}},
    	{$unwind:"$itens"},
	    {$project: {	_id:0,
		    			"itens.codigo":1,
			    		"itens.produto":1,
				    	"itens.variedade":1,
					    "itens.pais":1,
    					"itens.categoria":1,
	    				"itens.safra":1
		    		}},
    	{"$group": { 
	    	"_id": { 
                 codigo: "$itens.codigo"
                ,produto: "$itens.produto"
                ,variedade: "$itens.variedade"
                ,pais: "$itens.pais"
                ,categoria: "$itens.categoria"
                , safra: "$itens.safra"},
	    	count: {$sum:1}}},
	    {$sort : {count: -1}}
	])
}
