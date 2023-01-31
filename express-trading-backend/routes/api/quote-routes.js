const router = require('express').Router();
const { Quote } = require('../../models');
const { Transaction } = require('../../models');

router.get('/dailyList', (req, res) => {
    Quote.findAll({
        order: [['created_at', 'DESC']],
    })
        .then(dbQuoteData => res.json(dbQuoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:quoteId', (req, res) => {
    Quote.findByPk(req.params.quoteId)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;