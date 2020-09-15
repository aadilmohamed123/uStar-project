const { randNumFunc } = require("../../utils/utils");

exports.up = function (knex) {
  // console.log("creating children table");

  return knex.schema.createTable("children", (childrenTable) => {
    childrenTable.increments("child_id").primary();
    childrenTable.integer("login_code").defaultTo(randNumFunc());
    childrenTable.string("child_name").notNullable();
    childrenTable.string("parent_email").references("parents.parent_email");
    childrenTable.integer("star_count").defaultsTo(0);
  });
};

exports.down = function (knex) {
  // console.log("removing children table");
  return knex.schema.dropTable("children");
};
