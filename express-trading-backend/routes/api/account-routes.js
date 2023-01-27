const router = require('express').Router();
const { Trader } = require('../../models');
const { Transaction } = require('../../models');

router.get('/transactionHistory/:traderId', (req, res) => {
    Transaction.findAll({
        where: { id: req.params.traderId }
    })
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/accountBalance/:traderId', (req, res) => {
    Trader.findByPk(req.params.traderId)
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/deposit/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" })
});

router.post('/withdraw/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" })
});

module.exports = router;