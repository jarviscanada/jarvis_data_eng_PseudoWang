const router = require('express').Router();
const { Trader } = require('../../models');

router.get('/', (req, res) => {
    Trader.findAll({
        order: [['id', 'DESC']],
    })
        .then(dbTraderData => res.json(dbTraderData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    res.status(500).json({ message: "not implemented" })
});

router.delete('/:traderId', (req, res) => {
    res.status(500).json({ message: "not implemented" })
});

module.exports = router;