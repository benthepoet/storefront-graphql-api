const Bottle = require('bottlejs');

const config = require('./config');
const knex = require('./data/knex');
const { UserController } = require('./controllers');
const { UserService } = require('./services');

module.exports.buildContext = (user) => {
  const bottle = new Bottle();
  bottle.value('config', config);
  bottle.value('knex', knex);
  bottle.value('user', user);
  bottle.service('UserService', UserService, 'config', 'knex');
  bottle.service('UserController', UserController, 'UserService');
  return bottle.container;
};