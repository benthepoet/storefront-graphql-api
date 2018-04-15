const { NODE_ENV = 'development' } = process.env;
const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile[NODE_ENV]);

module.exports = knex;