const connection = require("../db/connection");
const { fetchRewardsByChildId, removeReward } = require("./rewards.models");
const { fetchTasksByChildId, removeTask } = require("./tasks.models");

exports.fetchChildrenByParent = (parent_email) => {
  return connection
    .select("*")
    .from("children")
    .where("parent_email", parent_email);
};
exports.fetchChildByChildId = (id) => {
  return connection.select("*").from("children").where("child_id", id);
};
exports.createChild = (parent_email, child_name) => {
  return connection
    .insert({ parent_email, child_name })
    .into("children")
    .returning("*")
    .then((res) => {
      const [postedChild] = res;
      return postedChild;
    });
};
exports.removeChild = (child_id) => {
  const deleteRewards = fetchRewardsByChildId(child_id).then((rewards) => {
    rewards.forEach((reward) => removeReward(reward.reward_id));
  });
  const deleteTasks = fetchTasksByChildId(child_id).then((tasks) => {
    tasks.forEach((task) => removeTask(task.task_id));
  });

  return Promise.all([deleteRewards, deleteTasks]).then(() => {
    return connection("children")
      .where("child_id", child_id)
      .del()
      .then((res) => {
        return res;
      });
  });
};
exports.updateChild = (child_id, star_inc) => {
  return connection("children")
    .where("child_id", child_id)
    .increment("star_count", star_inc)
    .returning("*")
    .then((res) => {
      const [updatedChild] = res;
      return updatedChild;
    });
};

exports.fetchChildByLoginCode = (login_code) => {
  return connection
    .select("*")
    .from("children")
    .where("login_code", login_code)
    .returning("*")
    .then((res) => {
      const [child] = res;
      return child;
    });
};
