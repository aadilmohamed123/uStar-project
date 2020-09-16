const {
  fetchAllParents,
  removeParent,
  fetchParentByEmail,
  createParent,
  updateParent,
} = require("../models/parents.models");

exports.getAllParents = (req, res) => {
  fetchAllParents().then((parents) => {
    res.send({ parents });
  });
};
exports.getParentByEmail = (req, res) => {
  const { parent_email } = req.params;
  fetchParentByEmail(parent_email).then((parent) => {
    res.send({ parent: parent[0] });
  });
};
exports.deleteParent = (req, res, next) => {
  const { parent_email } = req.params;
  removeParent(parent_email)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.postParent = (req, res) => {
  const { parent_email, parent_name } = req.body;

  createParent(parent_email, parent_name).then((parent) => {
    res.status(201).send({ parent });
  });
};
exports.patchParent = (req, res, next) => {
  const { parent_email } = req.params;
  const { parent_name } = req.body;

  updateParent(parent_email, parent_name)
    .then((updatedParent) => {
      res.status(200).send({ updatedParent });
    })
    .catch(next);
};
