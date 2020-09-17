exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.PSQLErrorHandler = (err, req, res, next) => {
  if (err.code) {
    const psqlErrors = {
      23503: { status: 404, msg: "404 Error: Child not found" },
      "22P02": { status: 400, msg: "400 - Bad Request" },
      "42P01": { status: 404, msg: "Relation does not exist" },
      42702: { status: 404, msg: "Author Is Ambiguous" },
      42703: { status: 400, msg: "Column Does Not Exist" },
      23502: { status: 404, msg: "404 Error: Not Found" },
    };
    err.column === "reward_description" || err.column === "task_description"
      ? err.length === 216
        ? (psqlErrors[23502] = { status: 404, msg: "404 Error: Not Found" })
        : (psqlErrors[23502] = { status: 400, msg: "400 - Bad Request" })
      : (psqlErrors[23502] = { status: 404, msg: "404 Error: Not Found" });
    err.length === 316
      ? (psqlErrors[23503] = {
          status: 403,
          msg:
            "403 Error: please remove children from account first and try again",
        })
      : (psqlErrors[23503] = {
          status: 404,
          msg: "404 Error: Child not found",
        });
    res
      .status(psqlErrors[err.code].status)
      .send({ msg: psqlErrors[err.code].msg });
  } else next(err);
};

exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
