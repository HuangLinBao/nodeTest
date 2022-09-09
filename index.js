const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
//import routes
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () =>
    console.log("server connection established")
);
//Middleware
app.use(express.json());

//Middleware routes
app.use("/api/users", authRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});