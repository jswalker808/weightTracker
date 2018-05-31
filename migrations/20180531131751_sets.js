
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sets', function(table) {
      table.increments('id').primary();
      table.integer('reps').unsigned();
      table.integer('weight').unsigned();
      table.integer('exerciseId').unsigned().index().references('id').inTable('exercises');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sets'),
  ]);
};
