
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('habits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {
          habitTitle: 'Fitness',
          categoryId: 1,
          userId: 1,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'Sleep',
          categoryId: 1,
          userId: 2,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'Health',
          categoryId: 1,
          userId: 3,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        }
      ]);
    });
};
