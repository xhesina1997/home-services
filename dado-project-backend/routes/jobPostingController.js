var express = require('express');
var router = express.Router();
const JobPosting = require('../repo/jobPosting');
module.exports = router;

router.get('/all', function (req, res) {
    JobPosting.find({}, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    })
});

router.post('/search/skip/:skip/take/:take', function (req, res) {
    JobPosting.find(req.body, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    }).skip(parseInt(req.params.skip)).limit(parseInt(req.params.take));
});

router.post('/add', function (req, res) {
    const jobPosting = new JobPosting(req.body);
    jobPosting.save(function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(prof);
        }
    })
});

router.put('/update', function (req, res) {
    JobPosting.findByIdAndUpdate(req.body._id, req.body, function (error, prof) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(true);
        }
    })
});

router.delete('/delete/:id', function (req, res) {
    JobPosting.remove({_id: req.params.id}, function (error, result) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            return res.send(result);
        }
    })
});

