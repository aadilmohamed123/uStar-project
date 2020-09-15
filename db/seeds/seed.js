const {
  parentsData,
  childrenData,
  tasksData,
  rewardsData,
} = require("../data/index.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("parents").insert(parentsData).returning("*");
    })
    .then(() => {
      return knex("children").insert(childrenData).returning("*");
    })
    .then(() => {
      const tasksInsertion = knex("tasks").insert(tasksData);
      const rewardsInsertion = knex("rewards").insert(rewardsData);

      return Promise.all([tasksInsertion, rewardsInsertion]);
    })
    .catch((err) => console.log(err));
};
