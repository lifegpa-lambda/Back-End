exports.up = function(knex, Promise) {
  return knex.schema.createTable('habits', tbl => {
    tbl.increments();

    tbl.string('habitTitle').notNullable();
    tbl.boolean('completed').defaultTo(false);
    tbl.integer('completionPoints').defaultTo(0);
    tbl
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    tbl
      .integer('categoryId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories');

    tbl.timestamp('createdAt').defaultTo(knex.fn.now());

    tbl.text('history').default("")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('habits');
};
