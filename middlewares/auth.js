const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    if (!req.cookies?.uid) {
        return res.redirect("/login");
    }

    const user = getUser(req.cookies.uid); // FIXED
    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    if (req.cookies?.uid) { // FIXED condition
        const user = getUser(req.cookies.uid);
        req.user = user;
    }
    next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
