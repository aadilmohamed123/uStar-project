const {
  parentsData,
  childrenData,
  tasksData,
  rewardsData,
} = require("../data/index.js");
const { randNumFunc, makeRefObj, formatData } = require("../../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("parents").insert(parentsData).returning("*");
    })
    .then(() => {
      childrenData.forEach((child)=>child.login_code = randNumFunc())
      return knex("children").insert(childrenData).returning("*");
    })
    .then((childrenRows) => {
      const lookUpObj = makeRefObj(childrenRows);

      const tasksInsertion = knex("tasks").insert(
        formatData(tasksData, lookUpObj)
      );
      const rewardsInsertion = knex("rewards").insert(
        formatData(rewardsData, lookUpObj)
      );

      return Promise.all([tasksInsertion, rewardsInsertion]);
    })
    .catch((err) => console.log(err));
};
