const db = require('../data/dbConfig.js');

module.exports = {
  findHabits,
  findHabitById,
  findHabitByUser,
  findHabitByCategory,
  addHabit,
  updateHabit,
  removeHabit,
  removeAllHabitsByUser
};

function findHabits() {
  return db('habits')
}

function findHabitById(id) {
  return db('habits')
    .where({ id })
    .first();
}

function findHabitByUser(id) {
  return db('habits')
    .where({ userId: id })
    .orderBy('id')
}

function findHabitByCategory(id) {
  return db('habits')
    .where({ categoryId: id })
    .first();
}

async function addHabit(habit) {
  const [id] = await db('habits').insert(habit).returning('id');

  return findHabitById(id);
}

function updateHabit(id, changes) {
  return db('habits')
  .where({ id })
  .update(changes, '*')
  .returning('id')
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
