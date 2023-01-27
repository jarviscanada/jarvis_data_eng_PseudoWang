const router = require('express').Router();
const { Trader } = require('../../models');

router.get('/', (req, res) => {
    Trader.findAll({
        order: [['id', 'ASC']],
    })
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Trader.create({
        firstName: req.body['firstName'],
        lastName: req.body['lastName'],
        dob: req.body['dob'],
        country: req.body['country'],
        email: req.body['email'],
        amount: req.body['amount'],
    })
        .then(trader => {
            res.status(200).json({ trader });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:traderId', (req, res) => {
    Trader.destroy({
        where: { id: req.params.traderId },
        limit: 1
    })
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;