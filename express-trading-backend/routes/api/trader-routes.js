const router = require('express').Router();
const { Trader } = require('../../models');

router.get('/', (req, res) => {
    Trader.findAll({
        order: [['id', 'ASC']],
    })
        .then(data => res.status(200).json(data))
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
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:traderId', (req, res) => {
    Trader.destroy({
        where: { id: req.params.traderId }
    })
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;