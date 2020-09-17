exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.PSQLErrorHandler = (err, req, res, next) => {
  if ((err.code = "23503"))
    err.length === 316
      ? res.status(403).send({
          msg:
            "403 Error: please remove children from account first and try again",
        })
      : res.status(404).send({
          msg: "404 Error: Child not found",
        });
  else next(err);
};
