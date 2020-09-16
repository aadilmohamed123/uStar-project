const { fetchAllParents, removeParent } = require("../models/parents.models");

exports.getAllParents = (req, res) => {
  fetchAllParents().then((parents) => {
    res.send({ parents });
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
