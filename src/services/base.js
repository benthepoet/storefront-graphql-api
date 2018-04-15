const knex = require('../data/knex');

class BaseService {
  constructor() {
    this.knex = knex;
  }
}

module.exports = BaseService;