const { fetchChildrenByParent } = require("../models/children.models");

exports.getChildrenByParent = (req, res) => {
  const { email } = req.params;
  fetchChildrenByParent(email).then((children) => {
    res.send({ children });
  });
};
