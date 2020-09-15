exports.up = function (knex) {
  console.log("creating parents table");
  return knex.schema.createTable("parents", (parentsTable) => {
    parentsTable.string("parent_email").notNullable().primary().unique();
    parentsTable.string("parent_name").notNullable();
    parentsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  console.log("removing parents table");

  return knex.schema.dropTable("parents");
};
