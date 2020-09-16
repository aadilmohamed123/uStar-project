const connection = require("../db/connection");
const { removeChild, fetchChildrenByParent } = require("./children.models");

exports.fetchAllParents = () => {
  return connection.select("*").from("parents");
};
// exports.removeParent = (parent_email) => {
//   const deleteChildren = fetchChildrenByParent(parent_email).then(
//     (children) => {
//       children.forEach((child) => removeChild(child.child_id));
//       // check if child is deleted
//     }
//   );

  return Promise.all([deleteChildren]).then(() => {
    return connection("parents")
      .where("parent_email", parent_email)
      .del()
      .then((res) => {
        return res;
      });
  });
};
