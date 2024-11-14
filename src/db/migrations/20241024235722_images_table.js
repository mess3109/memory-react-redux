/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable("images", table => {
    table.increments('id');
    table.string('artist_id');
    table.string('url');
    table.string('artsy_id');
    table.string('slug');
    table.string('title');

    table.unique('artsy_id')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("images");
};
