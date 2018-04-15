module.exports = {
  createAuthToken(_, { email, password }, { UserController }) {
    return UserController.authenticate(email, password);
  },
  createUser(_, { email, password }, { UserController }) {
    return UserController.createUser(email, password);
  }
};

