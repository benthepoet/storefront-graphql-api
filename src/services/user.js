const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const config = require('../config');
const BaseService = require('./base');

class UserService extends BaseService {
  async authenticate(email, password) {
    const user = await this
      .knex('User')
      .first('id', 'hash')
      .where({ email });
      
    const authError = new Error('The provided email and/or password is invalid.');
      
    if (user === undefined || user === null) {
      throw authError;
    }
    
    if (!bcrypt.compareSync(password, user.hash)) {
      throw authError;
    }
    
    return jsonwebtoken.sign(user.id, config.jwt);
  }
  
  async createUser(email, password) {
    const existingUser = await this
      .knex('User')
      .first('id')
      .where({ email });
      
    if (existingUser !== undefined && existingUser !== null) {
      throw new Error('The provided email is already in use.');
    }
    
    const hash = bcrypt.hashSync(password);
    
    const [id] = await this
      .knex('User')
      .insert({ 
        email,
        hash 
      });
      
    const profile = {
      id,
      roleId: 1
    };
      
    await this
      .knex('UserProfile')
      .insert(profile);
  }
}

module.exports = UserService;