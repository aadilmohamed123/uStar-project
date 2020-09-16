const apiRouter = require("express").Router();
const parentsRouter = require("./parents.router");
const childrenRouter = require("./children.router");
const tasksRouter = require("./tasks.router");
const rewardsRouter = require("./rewards.router");

apiRouter.use("/parents", parentsRouter);
apiRouter.use("/children", childrenRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/rewards", rewardsRouter);

module.exports = apiRouter;
