const connection = require("../db/connection");

exports.fetchChildrenByParent = (email) => {
  return connection.select("*").from("children").where("parent_email", email);
};
