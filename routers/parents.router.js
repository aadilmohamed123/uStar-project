const parentsRouter = require("express").Router();
const {
  getAllParents,
  deleteParent,
  getParentByEmail,
  postParent,
  patchParent,
} = require("../controllers/parents.controllers");
const {
  getChildrenByParent,
  postChild,
} = require("../controllers/children.controllers");

parentsRouter.route("/").get(getAllParents).post(postParent);
parentsRouter
  .route("/:parent_email")
  .get(getParentByEmail)
  .patch(patchParent)
  .delete(deleteParent);

parentsRouter
  .route("/:parent_email/children")
  .get(getChildrenByParent)
  .post(postChild);

module.exports = parentsRouter;
