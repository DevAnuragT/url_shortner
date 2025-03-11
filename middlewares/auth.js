const { getUser } = require("../services/auth");

//method-2 using authorization token 
async function checkForAuthentication(req, res, next) {
    // const authHeader = req.headers["authorization"];
    // req.user = null; // FIXED condition
    // if(!authHeader || !authHeader.startsWith("Bearer ")) { //method 2 instead of uid
    //     res.status(401).json({ message: "Unauthorized" });
    //     return next();
    // }
    // const token = authHeader.split("Bearer ")[1];
    // const user = getUser(token);
    // if(!user) {
    //     res.status(401).json({ message: "Unauthorized" });
    //     return next();
    // }

    const token = req.cookies?.token;
    req.user = null;
    if (!token) {
        return next();
    }
    const user = getUser(token);
    req.user = user;
    return next();
}

//method-1 using uid
// async function restrictToLoggedinUserOnly(req, res, next) {
//     if (!req.cookies?.uid) {
//         return res.redirect("/login");
//     }

//     const user = getUser(req.cookies.uid); // FIXED
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     if (req.cookies?.uid) { // FIXED condition
//         const user = getUser(req.cookies.uid);
//         req.user = user;
//     }
//     next();
// }

function restrictTo(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        return  next();
    };
}

module.exports = { checkForAuthentication, restrictTo };
