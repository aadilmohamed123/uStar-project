const tasksRouter = require("express").Router();
const { deleteTask, patchTask } = require("../controllers/tasks.controllers");
tasksRouter.route("/:task_id").delete(deleteTask).patch(patchTask);

module.exports = tasksRouter;
