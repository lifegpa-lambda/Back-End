const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUsers,
  findUserById,
  findByUserCreds,
  removeUser,
  updateUser
};

function findUsers() {
  return db('users')
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first()
}

function findByUserCreds(filter) {
  return db('users').where(filter).returning('*')
}

async function addUser(user) {
  const [id] = await db('users').insert(user).returning('id');

  return findUserById(id);
}

function updateUser(id, changes) {
  return db('users')
  .where({ id })
  .update(changes, '*')
  .returning('id')
}

function removeUser(id) {
  return db('users')
  .where({ id })
  .del();
}
