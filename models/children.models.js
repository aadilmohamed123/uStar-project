const connection = require("../db/connection");
const { fetchRewardsByChildId, removeReward } = require("./rewards.models");
const { fetchTasksByChildId, removeTask } = require("./tasks.models");
const { randNumFunc } = require("../utils/utils");

exports.fetchChildrenByParent = (parent_email) => {
  const children = connection
    .select("*")
    .from("children")
    .where("parent_email", parent_email)
    .returning("*");

  return Promise.all([children, checkParentExists(parent_email)]).then(
    (returningRows) => {
      const [array, parentExists] = returningRows;

      return parentExists
        ? array
        : Promise.reject({ status: 404, msg: "404 Error: Not found" });
    }
  );
};
exports.fetchChildByChildId = (id) => {
  return connection
    .select("*")
    .from("children")
    .where("child_id", id)
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });

      const [child] = res;
      return child;
    });
};
exports.createChild = (parent_email, child_name) => {
  return connection
    .insert({ parent_email, child_name, login_code: randNumFunc() })
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

exports.updateChild = (child_id, star_inc, child_name) => {
  return connection("children")
    .where("child_id", child_id)
    .modify((input) => {
      if (star_inc) input.increment("star_count", star_inc);
    })
    .modify((input) => {
      if (child_name) input.update({ child_name });
    })
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({
          status: 404,
          msg: "404 Error: Not found",
        });

      const [updatedChild] = res;
      return updatedChild;
    });
};

const checkParentExists = (parent_email) => {
  return connection
    .select("*")
    .from("parents")
    .where("parent_email", parent_email)
    .then((rows) => {
      if (rows.length !== 0) {
        return true;
      } else {
        return false;
      }
    });
};
