exports.up = function (knex) {
  console.log("creating rewards table");

  return knex.schema.createTable("rewards", (rewardsTable) => {
    rewardsTable.increments("reward_id").primary();
    rewardsTable.integer("child_id").references("children.child_id");
    rewardsTable.string("reward_description").notNullable();
    rewardsTable.integer("star_cost").defaultsTo(null);
  });
};

exports.down = function (knex) {
  console.log("removing rewards table");
  return knex.schema.dropTable("rewards");
};
