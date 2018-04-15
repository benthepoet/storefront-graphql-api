const BaseController = require('./base');

const { UserService } = require('../services');

class UserController extends BaseController {
  constructor() {
    super();
    this.userService = new UserService();
  }
  
  authenticate(_, { email, password }) {
    return this.userService.authenticate(email, password);
  }
  
  createUser(_, { email, password }) {
    return this.userService.createUser(email, password);
  }
}

module.exports = UserController;