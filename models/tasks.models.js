const connection = require("../db/connection");
const { updateChild } = require("./children.models");

exports.fetchTasksByChildId = (child_id) => {
  const tasks = connection
    .select("*")
    .from("tasks")
    .where("child_id", child_id)
    .returning("*");

  return Promise.all([tasks, checkChildrenExists(child_id)]).then(
    (returningRows) => {
      const [array, childExists] = returningRows;

      return childExists
        ? array
        : Promise.reject({ status: 404, msg: "404 Error: Not found" });
    }
  );
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
      if (res === 0)
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });
      return res;
    });
};
exports.updateTask = (task_id, task_status) => {
  return connection("tasks")
    .where("task_id", task_id)
    .update("task_status", task_status)
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });
      const [updatedTask] = res;

      return task_status !== ("completed" || "pending" || "outstanding")
        ? Promise.reject({ status: 400, msg: "400 - Bad Request" })
        : updatedTask;
    });

  // const taskPromise = connection("tasks")
  //   .where("task_id", task_id)
  //   .update("task_status", task_status)
  //   .returning("*");
  // return Promise.all([taskPromise]).then((res) => {
  //   const [[taskRows]] = res;
  //   console.log(taskRows);
  //   if (res.length === 0)
  //     return Promise.reject({ status: 404, msg: "404 Error: Not found" });
  //   const [updatedTask] = res;

  //   return task_status !== ("completed" || "pending" || "outstanding")
  //     ? Promise.reject({ status: 400, msg: "400 - Bad Request" })
  //     : updatedTask;
  // });

  // .then((updatedTask) => {
  //   const { child_id, stars_worth, task_status } = updatedTask;
  //   if (task_status === "completed") updateChild(child_id, stars_worth);
  // });
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
