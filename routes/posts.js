const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        posts: {
            title: "my first post",
            description: "Tf you doin here bruv?!",
        },
    });
});

module.exports = router;