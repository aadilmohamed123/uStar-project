const loginRouter = require("express").Router();
const { getChildByLogin } = require("../controllers/login.controllers");
const { handle405Errors } = require("../error_handlers");

loginRouter.route("/:login_code").get(getChildByLogin).all(handle405Errors);

module.exports = loginRouter;
