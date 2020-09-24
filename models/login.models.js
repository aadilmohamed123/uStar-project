const connection = require("../db/connection");

exports.fetchChildByLogin = (login_code) => {
  return connection
    .select("*")
    .from("children")
    .where("login_code", login_code)
    .returning("*")
    .then((res) => {
      if (res.length === 0)
        return Promise.reject({
          status: 404,
          msg:
            "404 Error: Not found, please check your number and try logging in again",
        });

      const [child] = res;
      return child;
    });
};
