exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments();

    tbl.string('categoryTitle').notNullable().unique()
    tbl.string('color', 128)
    tbl
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
