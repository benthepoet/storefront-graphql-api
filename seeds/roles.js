
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('Role').del()
    .then(() => {
      // Inserts seed entries
      return knex('Role').insert([
        { 
          id: 1, 
          name: 'User'
        }
      ]);
    });
};
