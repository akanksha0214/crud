const { validateToken } = require("../services/authenticate")

function checkForAuthenticateCookies(cookie) {
    return (req, res, next) => {
        const tokenCookiesValue = req.cookies[cookie];
        if (!tokenCookiesValue) {
            return next()
        }
        try {
            const userPayload = validateToken(tokenCookiesValue)
            req.user = userPayload;
        } catch (error) {
            req.user = null;
        }
        return next();
    }
}

module.exports = { checkForAuthenticateCookies }