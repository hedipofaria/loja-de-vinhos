var express = require('express');
var app = express();
var mongoose = require('mongoose');

var Cliente = require('./app/models/clientes');
var Compra = require('./app/models/compras');

var QueryClientesPorMaiorValorTotal = require('./app/querys/1_ClientesPorMaiorValorTotal');
var ClienteMaiorCompra2016 = require('./app/querys/2_ClienteMaiorCompra2016');
var ClientesFieis = require('./app/querys/3_ClientesFieis');
var RecomendacaoVinhoPeloHistorico = require('./app/querys/4_RecomendacaoVinhoPeloHistorico');

const uri = "mongodb+srv://admin:123cata@cluster0.ewu1s.mongodb.net/loja-de-vinhos?retryWrites=true&w=majority";
mongoose.connect(uri);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
var port = process.env.PORT || 8000;

/* Rotas */
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bem-Vindo a minha API!' });
});

/* Rotas de clientes */
router.route('/clientes')
    .get(function(req, res) {
        Cliente
            .find()
            .then(clientes => {
                res.json(clientes);
                return;
            })
            .catch((err) => {
                res.json({ msg: ("ERRO: " + err) });
            });
    });

router.route('/cliente')
    .post(function(req, res) {
        var cliente = new Cliente();

        cliente.id = req.query.id;
        cliente.nome = req.query.nome;
        cliente.cpf = req.query.cpf;

        cliente
            .save()
            .then(cliente => {
                res.json({ msg: "Cliente cadastrado com sucesso!", cliente });
                return;
            })
            .catch((err) => {
                res.json({ msg: ("ERRO: " + err) });
            });
})

router.route('/cliente/:id')
    .get(function(req, res) {
        Cliente
            .find({id : req.params.id})
            .then(cliente => {
                res.json(cliente);
                return;
            })
            .catch((err) => {
                res.json({ msg: ("ERRO: " + err) });
            });
    })

/* Rotas de compras */
router.route('/compras')
    .get(function(req, res) {
        Compra
            .find()
            .then(compras => {
                res.json(compras);
                return;
            })
            .catch((err) => {
                res.json({ msg: ("ERRO: " + err) });
            });
    });

/* Rotas das pesquisas */
router.route('/ClientesPorMaiorValorTotal')
.get(function(req, res) {
    QueryClientesPorMaiorValorTotal
    .getQuery()
    .exec()
    .then(pesquisa => {
        res.json(pesquisa);
        return;
    })
    .catch((err) => {
        res.json({ msg: ("ERRO: " + err) });
    });
});

router.route('/ClienteMaiorCompra2016')
.get(function(req, res) {
    ClienteMaiorCompra2016
    .getQuery()
    .exec()
    .then(pesquisa => {
        res.json(pesquisa);
        return;
    })
    .catch((err) => {
        res.json({ msg: ("ERRO: " + err) });
    });
});


router.route('/ClientesFieis')
.get(function(req, res) {
    ClientesFieis
    .getQuery()
    .exec()
    .then(pesquisa => {
        res.json(pesquisa);
        return;
    })
    .catch((err) => {
        res.json({ msg: ("ERRO: " + err) });
    });
});

/* Recebe como parametro o cpf (req.query.cpf) formato: "0000.000.000.00"*/
router.route('/RecomendacaoVinhoPeloHistorico')
.get(function(req, res) {
    RecomendacaoVinhoPeloHistorico
    .getQuery(req.query.cpf)
    .exec()
    .then(pesquisa => {
        res.json(pesquisa);
        return;
    })
    .catch((err) => {
        res.json({ msg: ("ERRO: " + err) });
    });
});

/* As rotas serão prefixadas com '/api' */
app.use('/api', router);

//Iniciando o Servidor (Aplicação):
app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);