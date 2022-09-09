const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../Validation");
const Bcrypt = require("bcrypt");

router.post("/register", async(req, res) => {
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return res.status(400).send("Email already registered");

    const salt = await Bcrypt.genSalt(10);
    const hash = await Bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (e) {
        res.status(400).send(e);
    }
});

//login

router.post("/login", async(req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not registered");
    const checkPass = await Bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return res.status(400).send("Password incorrect");

    res.send("Whats up Bitches!!!");
});

module.exports = router;