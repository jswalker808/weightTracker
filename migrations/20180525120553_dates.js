
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('logDates', function(table) {
      table.increments('id').primary();
      table.date('date');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('logDates'),
  ]);
};
