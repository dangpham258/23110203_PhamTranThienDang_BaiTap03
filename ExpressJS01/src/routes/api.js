const express = require("express");
const {
    createUser,
    handleLogin,
    getUser,
    forgotPassword,
    resetPassword,
    getAccount,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

routerAPI.all(/(.*)/, auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/forgot-password", forgotPassword);
routerAPI.post("/reset-password", resetPassword);

routerAPI.get("/user", getUser);
routerAPI.get("/account", auth, getAccount);

module.exports = routerAPI; //export default
