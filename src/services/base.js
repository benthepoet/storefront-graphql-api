class BaseService {
  constructor(config, knex) {
    this.config = config;
    this.knex = knex;
  }
}

module.exports = BaseService;