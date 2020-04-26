// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres:kitario:123456@localhost/soloapi'
  },
  test: {
    client: 'pg',
    connection: 'postgres:kitario:123456@localhost/test-soloapi'
  },


};
