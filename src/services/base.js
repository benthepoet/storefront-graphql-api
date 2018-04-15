const config = require('../config');
const knex = require('../data/knex');

class BaseService {
  constructor() {
    this.config = config;
    this.knex = knex;
  }
}

module.exports = BaseService;