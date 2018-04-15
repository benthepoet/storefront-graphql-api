const {
  UserController, 
  resolverFor
} = require('../../controllers');

module.exports = {
  createAuthToken: resolverFor(UserController, 'authenticate'),
  createUser: resolverFor(UserController, 'createUser')
};

