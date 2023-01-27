const router = require('express').Router();

router.get('/', (req, res) => {
    Trader.findAll({
        order: [['created_at', 'DESC']],
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