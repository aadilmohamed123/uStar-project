const { fetchTasksByChildId } = require("../models/tasks.models");

const {
  fetchRewardsByChildId,
  createReward,
} = require("../models/rewards.models");

exports.getRewardsByChildId = (req, res) => {
  const { child_id } = req.params;
  fetchRewardsByChildId(child_id).then((rewards) => {
    res.send({ rewards });
  });
};

exports.postReward = (req, res) => {
  const { child_id } = req.params;
  const { reward_description, star_cost } = req.body;
  createReward(child_id, reward_description, star_cost).then((reward) => {
    res.status(201).send({ reward });
  });
};
