import jwt from 'jsonwebtoken';

require('dotenv').config();


exports.MakeToken = function (id, name, isAdmin, email) {

    var token = jwt.sign({ id, name, isAdmin, email }, process.env.SECRET, {
        expiresIn: 3600000 // expires in 1 hours
    });
    return token
};