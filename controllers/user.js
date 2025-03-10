const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { setUser, getUser } = require("../services/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword
    });

    return res.redirect("/login"); // Redirect to login instead of home
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render("login", { error: "Invalid email or password" });
    }
    const token = setUser(user);
    res.cookie("uid", token);
    
    return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
