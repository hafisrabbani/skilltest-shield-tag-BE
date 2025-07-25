export function requestContext(req, res, next) {
    res.locals.context = {
        ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.get('user-agent') || '',
        startedAt: Date.now(),
    };
    next();
}