const UserRepository = require('../repository/user-repository.js');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler.js');
const ClientError = require('../utils/client-error.js');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      console.log(data);
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        throw error;
      }
      console.log('Something went wrong in the service layer');
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
      return result;
    } catch (error) {
      console.log('Something went wrong in token creation');
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log('Something went wrong in token validation', error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log('Something went wrong in password comparison', error);
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: 'Invalid token' };
      }
      console.log(response);
      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: 'NO user with corresponding token found' };
      }
      return user.id;
    } catch (error) {
      console.log('Something went wrong in authenticating token', error);
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (user) {
        const passwordsMatch = this.checkPassword(plainPassword, user.password);
        if (!passwordsMatch) {
          console.log('Password mismatch');
          throw { error: 'Incorrect Password' };
        }
        const newJWT = this.createToken({ email: user.email, id: user.id });
        return newJWT;
      }
    } catch (error) {
      if (error.name == 'AttributeNotFound') {
        throw error;
      }
      console.log('Something went wrong while sign in process', error);
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log('Something went wrong in service layer', error);
      throw error;
    }
  }
}
module.exports = UserService;
