
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('habits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {
          habitTitle: 'Workout',
          categoryId: 1,
          userId: 1,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: '8 hours of sleep',
          categoryId: 1,
          userId: 2,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'Drink a gallon of water',
          categoryId: 1,
          userId: 3,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'Run',
          categoryId: 1,
          userId: 2,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'Got to bed earlier',
          categoryId: 1,
          userId: 1,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        },
        {
          habitTitle: 'No sugar',
          categoryId: 1,
          userId: 1,
          completed: false,
          completionPoints: 0,
          createdAt: knex.fn.now()
        }
      ]);
    });
};
