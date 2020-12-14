var express = require('express');
var router = express.Router();
const User = require('../repo/user');
const TokenService = require('../service/tokenService');
module.exports = router;

router.post('/register', function (req, res) {
    const user = new User(req.body);
    user.save(function (error, user) {
        if (error) {
            if (error.code === 11000) {
                return res.status(409).send({error: error});
            } else {
                return res.status(500).send({error: error});
            }
        } else {
            return res.send({token: TokenService.generateAccessToken(TokenService.passwordRemovedUser(user))});
        }
    })
});

router.post('/signIn', function (req, res) {
    let query = {email: req.body.email, password: req.body.password};
    User.findOne(query, function (error, user) {
        if (error) {
            return res.status(500).send({error: error});
        } else {
            if (user) {
                return res.send({token: TokenService.generateAccessToken(TokenService.passwordRemovedUser(user))});
            } else {
                return res.status(401).send({});
            }
        }
    })
});

router.post('/token/refresh', function (req, res) {
    try {
        let decodedToken = TokenService.verifyToken(req.body.token);
        res.send({token: TokenService.generateAccessToken(decodedToken.user)});
    } catch (e) {
        return res.status(401).send({error: {message: e.message}});
    }
});
