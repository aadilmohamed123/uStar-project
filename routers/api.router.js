const apiRouter = require("express").Router();
const parentsRouter = require("./parents.router");
const childrenRouter = require("./children.router");
const tasksRouter = require("./tasks.router");
const rewardsRouter = require("./rewards.router");
const loginRouter = require("./login.router");

const { handle405Errors } = require("../error_handlers");

apiRouter.all("/", handle405Errors);

apiRouter.use("/parents", parentsRouter);
apiRouter.use("/children", childrenRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/rewards", rewardsRouter);
apiRouter.use("/login_code", loginRouter);

module.exports = apiRouter;
