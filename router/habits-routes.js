const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('habits')
  .select('*');
}

function findById(id) {
  return db('habits')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('habits').where(filter);
}

async function add(habit) {
  const [id] = await db('habits').insert(habit);

  return findById(id);
}

function update(id, changes) {
  return db('habits')
  .where({ id })
  .update(changes, '*');
}

function remove(id) {
  return db('habits')
  .where({ id })
  .del();
}
