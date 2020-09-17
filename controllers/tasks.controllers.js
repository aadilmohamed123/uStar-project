const {
  fetchTasksByChildId,
  createTask,
  removeTask,
  updateTask,
} = require("../models/tasks.models");

exports.getTasksByChildId = (req, res, next) => {
  const { child_id } = req.params;
  fetchTasksByChildId(child_id)
    .then((tasks) => {
      res.send({ tasks });
    })
    .catch(next);
};

exports.postTask = (req, res, next) => {
  const { child_id } = req.params;
  const { task_description, stars_worth } = req.body;
  createTask(child_id, task_description, stars_worth)
    .then((task) => {
      res.status(201).send({ task });
    })
    .catch(next);
};

exports.deleteTask = (req, res, next) => {
  const { task_id } = req.params;
  removeTask(task_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
exports.patchTask = (req, res, next) => {
  const { task_id } = req.params;
  const { task_status } = req.body;
updateTask(task_id, task_status)
        .then((updatedTask) => {
          res.status(200).send({ updatedTask });
        })
        .catch(next);
};
