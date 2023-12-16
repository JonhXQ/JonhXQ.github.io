/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex, promise) {
  return knex.schema.hasTable('product').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('product', function(table) {
        table.increments('product_id').primary();
        table.string('name');
        table.text('description');
        table.decimal('price',12,2);
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.hasTable('product').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('product');
    }
  })
};
