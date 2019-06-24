const db = require('../data/dbConfig.js');

module.exports = {
  findHabitById,
  findHabitByUser,
  addHabit,
  updateHabit,
  removeHabit,
  removeAllHabitsByUser
};

function findHabitById(id) {
  return db('habits')
    .where({ id })
    .first();
}

function findHabitByUser(id) {
  return db('habits')
    .where({ userId: id })
    .first();
}

async function addHabit(team) {
  const [id] = await db('habits').insert(team);

  return findHabitById(id);
}

function updateHabit(id, changes) {
  return db('habits')
  .where({ id })
  .update(changes, '*');
}

function removeHabit(id) {
  return db('habits')
  .where({ id })
  .del();
}

function removeAllHabitsByUser(id) {
  return db('habits')
  .where({ userId: id })
  .del();
}
