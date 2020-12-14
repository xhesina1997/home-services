const jwt = require("jsonwebtoken");
const SECRET = 'lsadmwqeasdkl23947nasdhjbudas';

function generateAccessToken(user) {
    return jwt.sign({user}, SECRET, {expiresIn: '24h'});
}

function verifyToken(token) {
    return jwt.verify(token, SECRET, {expiresIn: '24h'});
}

function passwordRemovedUser(user) {
    let toBeEncodedUser = user;
    toBeEncodedUser.password = null;
    return toBeEncodedUser;
}

module.exports = {
    generateAccessToken,
    passwordRemovedUser,
    verifyToken
};
