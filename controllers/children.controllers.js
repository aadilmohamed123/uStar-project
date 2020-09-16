const {
  fetchChildrenByParent,
  fetchChildByChildId,
} = require("../models/children.models");

exports.getChildrenByParent = (req, res) => {
  const { email } = req.params;
  fetchChildrenByParent(email).then((children) => {
    res.send({ children });
  });
};

exports.getChildByChildId = (req, res) => {
  const { child_id } = req.params;
  fetchChildByChildId(child_id).then((child) => {
    res.send({ child: child[0] });
  });
};
