const router = require('express').Router();
const { Trader } = require('../../models');
const { Transaction } = require('../../models');

router.get('/transactionHistory/:traderId', (req, res) => {
    Transaction.findAll({
        where: { traderId: req.params.traderId }
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/accountBalance/:traderId', (req, res) => {
    Trader.findByPk(req.params.traderId, { attributes: ['id', 'amount'] })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/deposit/:traderId', (req, res) => {
    Trader.findByPk(req.params.traderId)
        .then(trader => {
            trader.increment('amount', { by: req.body.amount });
            res.json({ id: trader.id, trader_id: trader.id, amount: trader.amount });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/withdraw/:traderId', (req, res) => {
    Trader.findByPk(req.params.traderId)
        .then(trader => {
            trader.decrement('amount', { by: req.body.amount });
            res.json({ id: trader.id, trader_id: trader.id, amount: trader.amount });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;