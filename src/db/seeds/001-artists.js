/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('artists').del()
  await knex('artists').insert([
    {id: 1, name: 'mary', slug: 'mary-cassatt', artsy_id: '515b163338ad2d78ca0008f5'},
  ]);
};
