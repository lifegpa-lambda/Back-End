
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          categoryTitle: 'Fitness',
          color: 'red',
          userId: 1
        },
        {
          categoryTitle: 'Sleep',
          color: 'blue',
          userId: 2
        },
        {
          categoryTitle: 'Health',
          color: 'green',
          userId: 1
        }
      ]);
    });
};
