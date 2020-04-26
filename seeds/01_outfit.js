const outfits = require('../outfits');


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('outfit').del()
    .then(function () {
      // Inserts seed entries
      return knex('outfit').insert(outfits);
    });
};
