const tasksRouter = require("express").Router();
const { deleteTask, patchTask } = require("../controllers/tasks.controllers");
const { handle405Errors } = require("../error_handlers");
tasksRouter
  .route("/:task_id")
  .delete(deleteTask)
  .patch(patchTask)
  .all(handle405Errors);

module.exports = tasksRouter;
