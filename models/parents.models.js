const connection = require("../db/connection");
const { removeChild, fetchChildrenByParent } = require("./children.models");

exports.fetchAllParents = () => {
  return connection.select("*").from("parents");
};
exports.removeParent = (parent_email) => {
  const deleteChildren = fetchChildrenByParent(parent_email).then(
    (children) => {
      children.forEach((child) => removeChild(child.child_id));
    }
  );

  return deleteChildren.then(() => {
    setTimeout(() => {
      return connection("parents")
        .where("parent_email", parent_email)
        .del()
        .then((res) => {
          if (res === 0) {
            return Promise.reject({
              status: 404,
              msg: "404 Error: Not found",
            });
          }
          return res;
        });
    }, 5000);
  });
};
exports.fetchParentByEmail = (parent_email) => {
  return connection
    .select("*")
    .from("parents")
    .where("parent_email", parent_email)
    .returning("*")
    .then((res) => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });
      } else {
        const [parent] = res;
        return parent;
      }
    });
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

exports.updateParent = (parent_email, parent_name) => {
  return connection("parents")
    .where("parent_email", parent_email)
    .update("parent_name", parent_name)
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({ status: 404, msg: "404 Error: Not found" });

      const [updatedParent] = res;
      return updatedParent;
    });
};
