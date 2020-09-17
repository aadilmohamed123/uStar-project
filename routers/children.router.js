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

childrenRouter
  .route("/:child_id")
  .get(getChildByChildId)
  .delete(deleteChild)
  .patch(patchChild);
childrenRouter.route("/:child_id/tasks").get(getTasksByChildId).post(postTask);

childrenRouter
  .route("/:child_id/rewards")
  .get(getRewardsByChildId)
  .post(postReward);
childrenRouter.route("/").get(getChildByLoginCode);
module.exports = childrenRouter;
