const connection = require("../db/connection");

exports.fetchRewardsByChildId = (child_id) => {
  const rewards = connection
    .select("*")
    .from("rewards")
    .where("child_id", child_id)
    .returning("*");

  return Promise.all([rewards, checkChildrenExists(child_id)]).then(
    (returningRows) => {
      const [array, childExists] = returningRows;

      return childExists
        ? array
        : Promise.reject({ status: 404, msg: "404 Error: Not found" });
    }
  );
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
      if (res === 0) {
        return Promise.reject({
          status: 404,
          msg: "404 Error: Not found",
        });
      }
      return res;
    });
};

const checkChildrenExists = (child_id) => {
  return connection
    .select("*")
    .from("children")
    .where("child_id", child_id)
    .then((rows) => {
      if (rows.length !== 0) {
        return true;
      } else {
        return false;
      }
    });
};
