const Bottle = require('bottlejs');

const { UserController } = require('./controllers');
const { UserService } = require('./services');

module.exports.buildContext = (user) => {
  const bottle = new Bottle();
  bottle.constant('user', user);
  bottle.service('UserService', UserService);
  bottle.service('UserController', UserController, 'UserService');
  return bottle.container;
};