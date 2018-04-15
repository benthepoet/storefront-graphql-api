const BaseController = require('./base');

class UserController extends BaseController {
  constructor(userService) {
    super();
    this.userService = userService;
  }
  
  createAuthToken(email, password) {
    return this.userService.createAuthToken(email, password);
  }
  
  createUser(email, password) {
    return this.userService.createUser(email, password);
  }
}

module.exports = UserController;