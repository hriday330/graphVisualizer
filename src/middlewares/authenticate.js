function authenticate(req, res, next) {
    console.log(req.session)
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = req.session.userId;
    next();
}

module.exports = authenticate;
