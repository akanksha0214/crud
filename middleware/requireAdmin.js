function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).send("Access denied: Admin only");
    }
    next();
}

module.exports = { requireAdmin };
