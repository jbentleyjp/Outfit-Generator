const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');


//wanted to get these to work for tests in package.json but coulnd't #windowsissues
// "(dropdb -U postgres --if-exists test-soloapi && createdb -U postgres test-soloapi) && set NODE_ENV=test && mocha"


describe('CRUD Outfits', () => {
    before((done) => {
        //run migrations
        knex.migrate.latest()
            .then(() => {
                //run seeds
                return knex.seed.run();
        }).then(() => done());
    });
    it('should list all records', (done) => {
        request(app)
        .get('/api/outfits')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('array');
            console.log(response.body);
            done();
        })
    });

});