const {
  fetchChildrenByParent,
  fetchChildByChildId,
  createChild,
  removeChild,
  updateChild
} = require("../models/children.models");

exports.getChildrenByParent = (req, res) => {
  const { parent_email } = req.params;
  fetchChildrenByParent(parent_email).then((children) => {
    res.send({ children });
  });
};

exports.getChildByChildId = (req, res) => {
  const { child_id } = req.params;
  fetchChildByChildId(child_id).then((child) => {
    res.send({ child: child[0] });
  });
};
exports.postChild = (req, res) => {
  const { parent_email } = req.params;
  const { child_name } = req.body;

  createChild(parent_email, child_name).then((child) => {
    res.status(201).send({ child });
  });
};

exports.deleteChild = (req, res) => {
  const { child_id } = req.params;
  removeChild(child_id).then(() => {
    res.sendStatus(204);
  });
};
exports.patchChild = (req, res, next) => {
  const { child_id } = req.params;
  const { star_inc } = req.body;

  updateChild(child_id, star_inc)
    .then((updatedChild) => {
      res.status(200).send({ updatedChild });
    })
    .catch(next);
};
