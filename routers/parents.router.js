const parentsRouter = require("express").Router();
const { getAllParents } = require("../controllers/parents.controllers");
const { getChildrenByParent } = require("../controllers/children.controllers");

parentsRouter.route("/").get(getAllParents);
parentsRouter.route("/:email/children").get(getChildrenByParent);

module.exports = parentsRouter;
