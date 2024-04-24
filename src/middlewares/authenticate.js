const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    let userId;
    if(req?.params?.userId) {
        userId = Number(req.params.userId)
    } else if (req?.body?.userId) {
        userId = Number(req.body.userId)
    }

    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err || (userId !== decoded.userId)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Set the user ID in the request object
        req.userId = decoded.userId;
        next();
    });
}

module.exports = authenticate;
