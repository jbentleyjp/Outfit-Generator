const knex = require('./knex'); // the connection

module.exports = {
    getByWeather(query) {
        const knexQuery = knex('outfit');
        if(query.weather){
            knexQuery.where('weather', 'like', `%${query.weather}%`);
        }
        return knexQuery;
    },
    getAll(){
        return knex('outfit');
    },

    getOne(id) {
        return knex('outfit').where('id', id).first();
    },
    create(outfit) {
        return knex('outfit').insert(outfit, "*");
    },
    update(id, outfit) {
        return knex('outfit').where('id', id).update(outfit, "*");
    },
    delete(id) {
        return knex('outfit').where('id', id).del()
    }
}