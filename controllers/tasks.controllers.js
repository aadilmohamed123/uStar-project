const {
  fetchTasksByChildId,
  createTask,
  removeTask,
} = require("../models/tasks.models");

exports.getTasksByChildId = (req, res) => {
  const { child_id } = req.params;
  fetchTasksByChildId(child_id).then((tasks) => {
    res.send({ tasks });
  });
};

exports.postTask = (req, res) => {
  const { child_id } = req.params;
  const { task_description, stars_worth } = req.body;
  createTask(child_id, task_description, stars_worth).then((task) => {
    res.status(201).send({ task });
  });
};

exports.deleteTask = (req, res) => {
  const { task_id } = req.params;
  removeTask(task_id).then(() => {
    res.sendStatus(204);
  });
};
