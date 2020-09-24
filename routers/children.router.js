const childrenRouter = require("express").Router();

const {
  patchChild,
  getChildByChildId,
  deleteChild,
  getChildByLoginCode,
} = require("../controllers/children.controllers");
const {
  getTasksByChildId,
  postTask,
} = require("../controllers/tasks.controllers");
const {
  getRewardsByChildId,
  postReward,
} = require("../controllers/rewards.controllers");
const { handle405Errors } = require("../error_handlers");

childrenRouter
  .route("/:child_id")
  .get(getChildByChildId)
  .delete(deleteChild)
  .patch(patchChild)
  .all(handle405Errors);

childrenRouter
  .route("/:child_id/tasks")
  .get(getTasksByChildId)
  .post(postTask)
  .all(handle405Errors);

childrenRouter
  .route("/:child_id/rewards")
  .get(getRewardsByChildId)
  .post(postReward);
childrenRouter.route("/").all(handle405Errors);
module.exports = childrenRouter;
