const connection = require("../db/connection");

exports.fetchAllParents = () => {
  return connection.select("*").from("parents");
};
