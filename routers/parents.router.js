const parentsRouter = require("express").Router();
const {
  getAllParents,
  deleteParent,
} = require("../controllers/parents.controllers");
const {
  getChildrenByParent,
  postChild,
} = require("../controllers/children.controllers");

parentsRouter.route("/").get(getAllParents);
parentsRouter.route("/:parent_email/").delete(deleteParent);
parentsRouter
  .route("/:parent_email/children")
  .get(getChildrenByParent)
  .post(postChild);

module.exports = parentsRouter;
