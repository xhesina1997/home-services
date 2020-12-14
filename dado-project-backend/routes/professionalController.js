var express = require('express');
var router = express.Router();
const Professional = require('../repo/professional');
module.exports = router;

router.get('/all', function (req, res) {
    Professional.find({}, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    })
});

router.post('/search/skip/:skip/take/:take', function (req, res) {
    Professional.find(req.body, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.take));
});

router.post('/add', function (req, res) {
    const professional = new Professional(req.body);
    professional.save(function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    })
});

router.put('/update', function (req, res) {
    Professional.findByIdAndUpdate(req.body._id, req.body, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(true);
        }
    })
});

router.delete('/delete/:id', function (req, res) {
    Professional.remove({_id: req.params.id}, function (error, result) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(result);
        }
    })
});

