const { fetchAllParents } = require("../models/parents.models");

exports.getAllParents = (req, res) => {
  fetchAllParents().then((parents) => {
    res.send({ parents });
  });
};
