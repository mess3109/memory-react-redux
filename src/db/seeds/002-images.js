/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('images').del()
  await knex('images').insert([
    {id: 1, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
    {id: 2, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/nYda7YCiY06VYGVRvfgc4A/medium.jpg'},
    {id: 3, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
    {id: 4, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
    {id: 5, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
    {id: 6, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
    {id: 7, artist_id: 1, url: 'https://d32dm0rphc51dk.cloudfront.net/sLk9dUSR9rK8VHKj8XwmiA/medium.jpg'},
  ]);
};
