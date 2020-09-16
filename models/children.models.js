const connection = require("../db/connection");

exports.fetchChildrenByParent = (email) => {
  return connection.select("*").from("children").where("parent_email", email);
};
exports.fetchChildByChildId = (id) => {
  return connection.select("*").from("children").where("child_id", id);
};
