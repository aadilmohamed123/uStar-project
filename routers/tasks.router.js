const tasksRouter = require("express").Router();
const { deleteTask } = require("../controllers/tasks.controllers");
tasksRouter.route("/:task_id").delete(deleteTask);

module.exports = tasksRouter;
