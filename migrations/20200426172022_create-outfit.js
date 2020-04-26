
exports.up = function(knex, Promise) {
    return knex.schema.createTable('outfit', (table) => {
        table.increments();
        table.text('title');
        table.text('description');
        table.text('weather');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('outfit');
  
};
