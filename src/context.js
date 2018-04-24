const { Injector } = require('fast-inject');

const config = require('./config');
const knex = require('./data/knex');
const { UserController } = require('./controllers');
const { UserService } = require('./services');

module.exports.contextBuilder = (user) => {
  const { container } = new Injector()
    .value('config', config)
    .value('knex', knex)
    .value('user', user)
    .service(UserService, ['config', 'knex'])
    .service(UserController, [UserService.name]);

  return container;
};