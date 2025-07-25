export const JWTExpirationToSec = () => {
    const expiration = process.env.JWT_EXPIRATION || '1h';
    const match = expiration.match(/(\d+)([smhd])/);
    if (!match) {
        throw new Error('Invalid JWT_EXPIRATION format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case 's':
            return value; // seconds
        case 'm':
            return value * 60; // minutes
        case 'h':
            return value * 3600; // hours
        case 'd':
            return value * 86400; // days
        default:
            throw new Error('Invalid time unit in JWT_EXPIRATION');
    }
}