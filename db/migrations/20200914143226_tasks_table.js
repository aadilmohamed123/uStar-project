exports.up = function (knex) {
  console.log("creating tasks table");

  return knex.schema.createTable("tasks", (tasksTable) => {
    tasksTable.increments("task_id").primary();
    tasksTable.integer("child_id").references("children.child_id");
    tasksTable.string("task_description").notNullable();
    tasksTable.string("task_status").notNullable().defaultsTo("outstanding");
    tasksTable.integer("star_worth").defaultsTo(1);
  });
};

exports.down = function (knex) {
  console.log("removing tasks table");
  return knex.schema.dropTable("tasks");
};
