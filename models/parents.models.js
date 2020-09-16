const connection = require("../db/connection");
const { removeChild, fetchChildrenByParent } = require("./children.models");

exports.fetchAllParents = () => {
  return connection.select("*").from("parents");
};
exports.removeParent = (parent_email) => {
  // only when children of parent are removed
  const deleteChildren = fetchChildrenByParent(parent_email).then(
    (children) => {
      children.forEach((child) => removeChild(child.child_id));
    }
  );

  return Promise.all([deleteChildren]).then(() => {
    return connection("parents")
      .where("parent_email", parent_email)
      .del()
      .then((res) => {
        return res;
      });
  });
};
exports.fetchParentByEmail = (parent_email) => {
  return connection
    .select("*")
    .from("parents")
    .where("parent_email", parent_email);
};

exports.createParent = (parent_email, parent_name) => {
  return connection
    .insert({ parent_email, parent_name })
    .into("parents")
    .returning("*")
    .then((res) => {
      const [postedParent] = res;
      return postedParent;
    });
};
