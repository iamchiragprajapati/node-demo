const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied. Token missing.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            next();
        } else {
            throw error;
        }
    } catch (error) {
        console.log('jwt error: ', error);
        return res.status(401).json({ error, message: 'Token is expired, Please Login again' });
    }
}

module.exports = { verifyToken };