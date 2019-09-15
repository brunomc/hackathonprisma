const { prisma } = require(`../../hack/prisma/${process.env.ENV || 'test'}/generated/index`);
import jwt from 'jsonwebtoken';

const freeWay = (query = '') => {
    const free = ['authenticate', 'IntrospectionQuery', 'getUserByToken', 'createUser', 'changePassword', 'requestResetPassword']
    for (let index = 0; index < free.length; index++) {
        const isFree = query.includes(free[index])
        if (isFree) return isFree
    }
    return false
}

export const verifyRequest = ({ req, res }) => {
    // get the user token from the 
    if (freeWay(JSON.stringify(req.body))) {
        return {
            prisma
        }
    }
    if (!req.headers.authorization) return res.status(401).send({ auth: false, message: 'No token provided.' });
    const token = req.headers.authorization.split('Bearer ')[1] || '';

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    return jwt.verify(token, process.env.JWT_SECRET || 'pacoca', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.user.id;
        return {
            user: decoded.user,
            prisma
        }
    })
}