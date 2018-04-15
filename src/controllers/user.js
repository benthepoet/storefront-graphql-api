const BaseController = require('./base');

class UserController extends BaseController {
  constructor(userService) {
    super();
    this.userService = userService;
  }
  
  authenticate(email, password) {
    return this.userService.authenticate(email, password);
  }
  
  createUser(email, password) {
    return this.userService.createUser(email, password);
  }
}

module.exports = UserController;