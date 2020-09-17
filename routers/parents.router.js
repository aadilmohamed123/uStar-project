const parentsRouter = require("express").Router();
const { handle405Errors } = require("../error_handlers");
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

parentsRouter
  .route("/")
  .get(getAllParents)
  .post(postParent)
  .all(handle405Errors);
parentsRouter
  .route("/:parent_email")
  .get(getParentByEmail)
  .patch(patchParent)
  .delete(deleteParent)
  .all(handle405Errors);

parentsRouter
  .route("/:parent_email/children")
  .get(getChildrenByParent)
  .post(postChild)
  .all(handle405Errors);


module.exports = parentsRouter;
