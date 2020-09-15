const apiRouter = require("express").Router();
const parentsRouter = require("./parents.router");

apiRouter.use("/parents", parentsRouter);

module.exports = apiRouter;
