import jwt from 'jsonwebtoken';
import { RegModel } from '../models/RegModel';

async function adminAuthentication(req, res, next) {
    try {
        var token = req.headers['x-access-token'];

        let decoded1
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        decoded1 = jwt.verify(token, process.env.SECRET)

        const adminData = await RegModel.findOne({ _id: decoded1.id, isAdmin: true })

        if (!adminData) {
            var error = {
                statusCode: 401,
                message: `UnAuthorize user`
            }
            throw error
        } else {
            req.query.id = adminData.id
            next();
        }

    } catch (error) {
        if (error.statusCode == 401) {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(401).send(response);
        }
        else {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(400).send(response);
        }
    }
}

export { adminAuthentication }