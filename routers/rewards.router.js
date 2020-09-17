const rewardsRouter = require("express").Router();
const { deleteReward } = require("../controllers/rewards.controllers");
const { handle405Errors } = require("../error_handlers");

rewardsRouter.route("/:reward_id").delete(deleteReward).all(handle405Errors);

module.exports = rewardsRouter