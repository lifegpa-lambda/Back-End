const db = require('../data/dbConfig.js');

module.exports = {
  addCategory,
  findCategories,
  findCategoryById,
  findCategoryByUser,
  findCategoryByHabit,
  updateCategory,
  removeCategory,
  removeAllCategoriesByUser
};

function findCategories(id) {
  return db('categories')
}

function findCategoryById(id) {
  return db('categories')
    .where({ id })
    .first();
}

function findCategoryByUser(id) {
  return db('categories')
    .where({ userId: id })
}

function findCategoryByHabit(id) {
  return db('habits')
    .where({ categoryId: id })
}

async function addCategory(category) {
  const [id] = await db('categories').insert(category).returning('id');

  return findCategoryById(id);
}

function updateCategory(id, changes) {
  return db('categories')
  .where({ id })
  .update(changes, '*')
  .returning('id')
}

function removeCategory(id) {
  return db('categories')
  .where({ id })
  .del();
}

function removeAllCategoriesByUser(id) {
  return db('categories')
  .where({ userId: id })
  .del();
}
