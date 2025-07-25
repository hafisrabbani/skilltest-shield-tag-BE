export function requestContext(req, res, next) {
    console.log(`Token from request: ${req.headers.authorization ? req.headers.authorization.split(' ')[1] : 'No token provided'}`);
    res.locals.context = {
        ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.get('user-agent') || '',
        startedAt: Date.now(),
        token: req.headers.authorization ? req.headers.authorization.split(' ')[1] : null,
    };
    next();
}