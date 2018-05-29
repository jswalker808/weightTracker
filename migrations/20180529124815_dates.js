
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('logDates', function(table) {
      table.integer('logID');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropColumn('logID'),
  ]);
};
