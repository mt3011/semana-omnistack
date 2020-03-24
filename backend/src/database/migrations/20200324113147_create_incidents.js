
exports.up = function(knex) {
  knex.schema.createTable('incidents', (table) => {
      table.incidents()

      table.string('title').notNullable()
      table.sting('description').notNullable()
      table.decimal('value').notNullable()

      table.string('ong_id').notNullable()
      table.foreing('ong_id').references('id').inTable('ongs')

  } )
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
