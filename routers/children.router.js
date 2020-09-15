const childrenRouter = require("express").Router();

childrenRouter.route("/").get(getChildrenByParent);

module.exports = childrenRouter;
