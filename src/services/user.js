const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const config = require('../config');
const BaseService = require('./base');

class UserService extends BaseService {
  async authenticate(email, password) {
    const hash = bcrypt.hashSync(password);
    
    const user = await this
      .knex('User')
      .first('User.hash', 'User.id')
      .innerJoin('UserProfile', 'User.id', 'UserProfile.id')
      .where('UserProfile.email', email);
      
    if (user === undefined || user === null) {
      throw new Error('The provided email and password are invalid.');
    }
    
    return jsonwebtoken.sign(user.id, config.jwt);
  }
  
  async createUser(email, password) {
    const existingUser = await this
      .knex('UserProfile')
      .first('id')
      .where('email', email);
      
    if (existingUser !== undefined && existingUser !== null) {
      throw new Error('The provided email is already in use.');
    }
    
    const hash = bcrypt.hashSync(password);
    
    const [id] = await this
      .knex('User')
      .insert({ hash });
      
    const profile = {
      email,
      id,
      roleId: 1
    };
      
    await this
      .knex('UserProfile')
      .insert(profile);
  }
}

module.exports = UserService;