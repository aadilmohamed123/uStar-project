const parentsRouter = require("express").Router();
const { getAllParents } = require("../controllers/parents.controllers");
parentsRouter.route("/").get(getAllParents);

module.exports = parentsRouter;
