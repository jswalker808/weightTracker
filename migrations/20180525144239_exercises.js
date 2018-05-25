
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('exercises', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('dateId').unsigned().index().references('id').inTable('logDates');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('exercises'),
  ]);
};
