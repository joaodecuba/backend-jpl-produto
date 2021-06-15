// Define a utilização do model produto e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const descrição = req.body.descrição;
    const preço = req.body.preço;
    const qt_estoque = req.body.qt_estoque;
  
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produto.create({
        nome: nome,
        descrição: descrição,
        preço: preço,
        qt_estoque: qt_estoque,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.Update = (req, res, next) => {
    const id = req.params.id;   
    const nome = req.body.nome;
    const descrição = req.body.descrição;
    const preço = req.body.preço;
    const qt_estoque = req.body.qt_estoque;
    


    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    id: id,
                    nome: nome,
                    descrição: descrição,
                    preço: preço,
                    qt_estoque: qt_estoque,
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

