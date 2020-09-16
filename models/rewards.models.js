const connection = require("../db/connection");

exports.fetchRewardsByChildId = (id) => {
  return connection.select("*").from("rewards").where("child_id", id);
};

exports.createReward = (child_id, reward_description, star_cost) => {
  return connection
    .insert({ child_id, reward_description, star_cost })
    .into("rewards")
    .returning("*")
    .then((res) => {
      const [postedReward] = res;
      return postedReward;
    });
};
exports.removeReward = (reward_id) => {
  return connection("rewards")
    .where("reward_id", reward_id)
    .del()
    .then((res) => {
      return res;
    });
};
