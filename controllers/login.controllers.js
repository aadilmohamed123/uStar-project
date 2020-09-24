const { fetchChildByLogin } = require("../models/login.models");

exports.getChildByLogin = (req, res, next) => {
  const { login_code } = req.params;

  fetchChildByLogin(login_code)
    .then((child) => {
      res.send({ child });
    })
    .catch(next);
};
