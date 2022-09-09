const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../Validation");

router.post("/register", async(req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;