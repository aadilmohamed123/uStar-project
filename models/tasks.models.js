const connection = require("../db/connection");

exports.fetchTasksByChildId = (id) => {
  return connection.select("*").from("tasks").where("child_id", id);
};

exports.createTask = (child_id, task_description, stars_worth) => {
  return connection
    .insert({ child_id, task_description, stars_worth })
    .into("tasks")
    .returning("*")
    .then((res) => {
      const [postedTask] = res;
      return postedTask;
    });
};

exports.removeTask = (task_id) => {
  return connection("tasks")
    .where("task_id", task_id)
    .del()
    .then((res) => {
      return res;
    });
};
