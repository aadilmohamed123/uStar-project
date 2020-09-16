const rewardsRouter = require("express").Router();
const { deleteReward } = require("../controllers/rewards.controllers");

rewardsRouter.route("/:reward_id").delete(deleteReward);

module.exports = rewardsRouter