module.exports = {
  createAuthToken(_, { email, password }, { UserController }) {
    return UserController.createAuthToken(email, password);
  },
  createUser(_, { email, password }, { UserController }) {
    return UserController.createUser(email, password);
  }
};

