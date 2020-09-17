const {
  fetchChildrenByParent,
  fetchChildByChildId,
  createChild,
  removeChild,
  updateChild,
  fetchChildByLoginCode,
} = require("../models/children.models");

exports.getChildrenByParent = (req, res, next) => {
  const { parent_email } = req.params;
  fetchChildrenByParent(parent_email)
    .then((children) => {
      res.send({ children });
    })
    .catch(next);
};

exports.getChildByChildId = (req, res, next) => {
  const { child_id } = req.params;
  fetchChildByChildId(child_id)
    .then((child) => {
      res.send({ child });
    })
    .catch(next);
};
exports.postChild = (req, res, next) => {
  const { parent_email } = req.params;
  const { child_name } = req.body;

  createChild(parent_email, child_name)
    .then((child) => {
      res.status(201).send({ child });
    })
    .catch(next);
};

exports.deleteChild = (req, res, next) => {
  const { child_id } = req.params;
  removeChild(child_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
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

exports.getChildByLoginCode = (req, res, next) => {
  const { login_code } = req.body;
  fetchChildByLoginCode(login_code)
    .then((child) => {
      res.send({ child });
    })
    .catch(next);
};
