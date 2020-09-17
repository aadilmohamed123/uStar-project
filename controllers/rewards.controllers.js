const { fetchTasksByChildId } = require("../models/tasks.models");

const {
  fetchRewardsByChildId,
  createReward,
  removeReward,
} = require("../models/rewards.models");

exports.getRewardsByChildId = (req, res, next) => {
  const { child_id } = req.params;
  fetchRewardsByChildId(child_id)
    .then((rewards) => {
      res.send({ rewards });
    })
    .catch(next);
};

exports.postReward = (req, res, next) => {
  const { child_id } = req.params;
  const { reward_description, star_cost } = req.body;
  createReward(child_id, reward_description, star_cost)
    .then((reward) => {
      res.status(201).send({ reward });
    })
    .catch(next);
};
exports.deleteReward = (req, res, next) => {
  const { reward_id } = req.params;
  removeReward(reward_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
