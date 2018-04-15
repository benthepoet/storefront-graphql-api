const UserController = require('./user');

module.exports = {
  UserController,
  resolverFor
};

function resolverFor(Controller, fn) {
  return (root, params, context) => {
    const controller = new Controller(context.user);
    return controller[fn](root, params, context);
  };
}