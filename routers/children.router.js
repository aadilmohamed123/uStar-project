const childrenRouter = require("express").Router();

const { getChildByChildId } = require("../controllers/children.controllers");
const {
  getTasksByChildId,
  postTask,
} = require("../controllers/tasks.controllers");
const {
  getRewardsByChildId,
  postReward,
} = require("../controllers/rewards.controllers");

childrenRouter.route("/:child_id").get(getChildByChildId);

childrenRouter.route("/:child_id/tasks").get(getTasksByChildId).post(postTask);

childrenRouter
  .route("/:child_id/rewards")
  .get(getRewardsByChildId)
  .post(postReward);

module.exports = childrenRouter;
