/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("artists", table => {
        table.increments('id');
        table.string('name');
        table.string('slug');
        table.string('artsy_id');

        table.unique('artsy_id');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("artists");
};
